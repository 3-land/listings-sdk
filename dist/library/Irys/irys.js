"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.IrysHelper = void 0;
const sdk_1 = require("@irys/sdk");
const utils_1 = require("../../utility/utils");
const PdaManager_1 = require("../../utility/PdaManager");
const crypto_1 = __importDefault(require("crypto"));
const web3_js_1 = require("@solana/web3.js");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
class IrysHelper {
    constructor() {
        this.files_bridge = {};
    }
    // private irys?: WebIrys;
    // private wallet?: Keypair;
    // private owner?: string;
    ensureInitialized() {
        if (!this.irys || !this.wallet || !this.owner) {
            throw new Error("IrysHelper not properly initialized. Call init() first.");
        }
    }
    // async verifyBalance(id: any): Promise<boolean> {
    //   this.ensureInitialized();
    //   try {
    //     const fundtx = await this.irys.fund(id);
    //     return !!fundtx;
    //   } catch (e) {
    //     console.log("CANNOT VERIFY FUND", e);
    //   }
    //   return false;
    // }
    // async getBalance(): Promise<any> {
    //   this.ensureInitialized();
    //   return this.irys.getLoadedBalance();
    // }
    async verifyBalance(id) {
        try {
            const submited = await this.irys.funder.submitTransaction(id);
            return submited;
        }
        catch (e) {
            console.log("CANNOT VERIFY FUND", e);
        }
        return false;
    }
    async getBalance() {
        return this.irys.getLoadedBalance();
    }
    async bundle(file, is_metadata = false) {
        console.log("BUNDLE: ", file);
        console.log("BUNDLE method: ", file.arrayBuffer());
        this.ensureInitialized();
        try {
            const { type, name } = file;
            const nonce = file.nonce || crypto_1.default.randomBytes(32).toString("base64").slice(0, 32);
            const tags = [{ name: "Content-Type", value: type }];
            const irys_wallet = this.irys.address;
            const arrayBuffer = await file.arrayBuffer();
            console.log("main image buffer 2: ", arrayBuffer);
            const buffer = Buffer.from(arrayBuffer);
            console.log("main image buffer 3: ", arrayBuffer);
            let transaction = this.irys.createTransaction(buffer, {
                anchor: nonce,
                tags,
            });
            console.log("TRANSACTION: ", transaction);
            const { size } = transaction;
            const price = await this.irys.getPrice(transaction.size);
            const slippage_fee = Math.round(price.div(6).toNumber());
            await transaction.sign();
            const extension = this.getFileExtension(file);
            const id = transaction?.id;
            if (!id)
                throw "No id";
            const url = "https://arweave.net/" +
                id +
                (extension && !file.is_metadata && !is_metadata
                    ? "?ext=" + extension
                    : "");
            file.payload = false;
            file.irys = {
                id,
                size,
                url,
                extension,
                nonce,
                transaction,
                irys_wallet,
                price: price.toNumber(),
                slippage_fee,
            };
            return file;
        }
        catch (e) {
            console.log("ERRORE", e);
            throw new Error("error in bundle Irys");
        }
    }
    getFileExtension(file) {
        if (!file) {
            return null;
        }
        // Try to get extension from filename
        if (file.name) {
            const parts = file.name.split(".");
            if (parts.length > 1) {
                const extension = parts.pop(); // Get last part
                if (extension) {
                    return extension;
                }
            }
        }
        // Fallback to MIME type
        if (file.type) {
            const parts = file.type.split("/");
            if (parts.length > 1) {
                return parts[1];
            }
        }
        return null;
    }
    parseTransaction(transactionStr) {
        try {
            const parsed = JSON.parse(transactionStr);
            return Array.isArray(parsed) ? parsed[0] : null;
        }
        catch (e) {
            console.log("Error parsing transaction:", e);
            return null;
        }
    }
    async getFundingInstructions({ files, payer }) {
        this.ensureInitialized();
        if (!payer)
            payer = this.owner;
        let bytes = 0;
        let price = false;
        if (!files)
            return;
        for (const file of files) {
            if (!file.irys) {
                throw new Error("File not properly bundled");
            }
            const files_price = await this.irys.getPrice(file.irys.size);
            if (!price) {
                price = files_price;
            }
            else {
                price = price.plus(files_price);
            }
            bytes += file.irys.size;
            file.irys.price = price.toNumber();
        }
        const irys_address = await this.irys.utils.getBundlerAddress("solana");
        const slippage_fee = Math.round(price.div(6).toNumber());
        price = price.plus(slippage_fee);
        const from_user_to_manager = web3_js_1.SystemProgram.transfer({
            fromPubkey: (0, PdaManager_1.toPublicKey)(payer),
            toPubkey: this.wallet.publicKey,
            lamports: price,
        });
        const from_manager_to_irys = web3_js_1.SystemProgram.transfer({
            fromPubkey: this.wallet.publicKey,
            toPubkey: (0, PdaManager_1.toPublicKey)(irys_address),
            lamports: price,
        });
        return {
            instructions: [from_user_to_manager, from_manager_to_irys],
            bytes,
            price: price.toNumber(),
        };
    }
    async generateWallet() {
        return web3_js_1.Keypair.generate();
    }
    async getWallet() {
        return this.wallet;
    }
    arweaveToID(x) {
        return "irys-preupload-" + x;
    }
    async uploadFiles({ uuid, signature }) {
        this.ensureInitialized();
        await this.irys.ready();
        const files = [];
        for (const file in this.files_bridge) {
            files.push(this.files_bridge[file]);
        }
        await this.verifyBalance(signature);
        const errors = [];
        const succeeds = [];
        for (const _file of files) {
            if (!_file.irys) {
                continue;
            }
            if (_file.status == "uploaded" && _file.arweave) {
                succeeds.push(_file.arweave);
                continue;
            }
            const blob = this.files_bridge[this.arweaveToID(_file.irys.id)];
            if (!blob) {
                errors.push(_file.irys.id);
                continue;
            }
            blob.nonce = _file.irys.nonce;
            const bundled = await this.bundle(blob);
            if (!bundled || !bundled.irys || bundled.irys.id != _file.irys.id) {
                errors.push(_file.irys.id);
                continue;
            }
            try {
                const subida = await bundled.irys.transaction.upload();
                if (subida) {
                    succeeds.push(bundled.irys.id);
                }
                else {
                    throw "";
                }
            }
            catch (e) {
                const error = e + "";
                if (error.includes("already received")) {
                    succeeds.push(bundled.irys.id);
                }
                else {
                    errors.push(_file.irys.id);
                }
            }
            await (0, utils_1.sleep)(100);
        }
        const balance = await this.getBalance();
        return { errors, succeeds };
    }
    async clean() { }
    async registerFiles({ files, uuid }) {
        this.ensureInitialized();
        const owner = this.owner;
        this.files_bridge = {};
        for (const [index, _file] of files.entries()) {
            if (!_file.irys) {
                continue;
            }
            const arweave = _file.irys.id;
            const data = {
                type: _file.type,
                nonce: _file.irys.nonce,
                size: _file.irys.size,
                fee_at_submit: _file.irys.price,
                slippage_fee: _file.irys.slippage_fee,
            };
            const tosave = {
                owner,
                arweave,
                uuid,
                status: "waiting",
                date: (0, utils_1.nowS)(),
                data,
                payload: _file.payload,
            };
            this.files_bridge[this.arweaveToID(arweave)] = _file;
        }
        return files.length;
    }
    async sync(address) {
        if (this.owner != address) {
            return true;
        }
        return true;
    }
    async init(address, options) {
        const irys_network = options?.arweave_rpc || "https://arweave.devnet.irys.xyz";
        const rpc = options?.rpc || "https://api.devnet.solana.com";
        const wallet = await this.generateWallet();
        if (!wallet)
            return false;
        this.wallet = wallet;
        const provider = {
            publicKey: wallet.publicKey,
            signMessage: async (message) => {
                return tweetnacl_1.default.sign.detached(message, this.wallet.secretKey);
            },
        };
        this.owner = address;
        this.irys = new sdk_1.NodeIrys({
            // url: irys_network,
            token: "solana",
            key: wallet.secretKey,
            network: options?.network || "devnet",
            config: { providerUrl: irys_network },
            // wallet: { rpcUrl: rpc, provider },
        });
        console.log("irysconfig inside: ", this.irys);
        await this.irys.ready();
        const to = await this.irys.utils.getBundlerAddress("solana");
        const bal = await this.getBalance();
        return true;
    }
}
exports.IrysHelper = IrysHelper;
let global = null;
const init = async (address, options) => {
    if (global) {
        const g = await global.sync(address);
        if (!g)
            global = null;
        return global;
    }
    global = new IrysHelper();
    const g = await global.init(address, options);
    if (!g)
        global = null;
    return global;
};
exports.init = init;
//# sourceMappingURL=irys.js.map