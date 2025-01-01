var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NodeIrys } from "@irys/sdk";
import { sleep, nowS } from "../../utility/utils";
import { toPublicKey } from "../../utility/PdaManager";
import crypto from "crypto";
import { SystemProgram, Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
export class IrysHelper {
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
    verifyBalance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submited = yield this.irys.funder.submitTransaction(id);
                return submited;
            }
            catch (e) {
                console.log("CANNOT VERIFY FUND", e);
            }
            return false;
        });
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.irys.getLoadedBalance();
        });
    }
    bundle(file_1) {
        return __awaiter(this, arguments, void 0, function* (file, is_metadata = false) {
            console.log("BUNDLE: ", file);
            console.log("BUNDLE method: ", file.arrayBuffer());
            this.ensureInitialized();
            try {
                const { type, name } = file;
                const nonce = file.nonce || crypto.randomBytes(32).toString("base64").slice(0, 32);
                const tags = [{ name: "Content-Type", value: type }];
                const irys_wallet = this.irys.address;
                const arrayBuffer = yield file.arrayBuffer();
                console.log("main image buffer 2: ", arrayBuffer);
                const buffer = Buffer.from(arrayBuffer);
                console.log("main image buffer 3: ", arrayBuffer);
                let transaction = this.irys.createTransaction(buffer, {
                    anchor: nonce,
                    tags,
                });
                console.log("TRANSACTION: ", transaction);
                const { size } = transaction;
                const price = yield this.irys.getPrice(transaction.size);
                const slippage_fee = Math.round(price.div(6).toNumber());
                yield transaction.sign();
                const extension = this.getFileExtension(file);
                const id = transaction === null || transaction === void 0 ? void 0 : transaction.id;
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
        });
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
    getFundingInstructions(_a) {
        return __awaiter(this, arguments, void 0, function* ({ files, payer }) {
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
                const files_price = yield this.irys.getPrice(file.irys.size);
                if (!price) {
                    price = files_price;
                }
                else {
                    price = price.plus(files_price);
                }
                bytes += file.irys.size;
                file.irys.price = price.toNumber();
            }
            const irys_address = yield this.irys.utils.getBundlerAddress("solana");
            const slippage_fee = Math.round(price.div(6).toNumber());
            price = price.plus(slippage_fee);
            const from_user_to_manager = SystemProgram.transfer({
                fromPubkey: toPublicKey(payer),
                toPubkey: this.wallet.publicKey,
                lamports: price,
            });
            const from_manager_to_irys = SystemProgram.transfer({
                fromPubkey: this.wallet.publicKey,
                toPubkey: toPublicKey(irys_address),
                lamports: price,
            });
            return {
                instructions: [from_user_to_manager, from_manager_to_irys],
                bytes,
                price: price.toNumber(),
            };
        });
    }
    generateWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            return Keypair.generate();
        });
    }
    getWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.wallet;
        });
    }
    arweaveToID(x) {
        return "irys-preupload-" + x;
    }
    uploadFiles(_a) {
        return __awaiter(this, arguments, void 0, function* ({ uuid, signature }) {
            this.ensureInitialized();
            yield this.irys.ready();
            const files = [];
            for (const file in this.files_bridge) {
                files.push(this.files_bridge[file]);
            }
            yield this.verifyBalance(signature);
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
                const bundled = yield this.bundle(blob);
                if (!bundled || !bundled.irys || bundled.irys.id != _file.irys.id) {
                    errors.push(_file.irys.id);
                    continue;
                }
                try {
                    const subida = yield bundled.irys.transaction.upload();
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
                yield sleep(100);
            }
            const balance = yield this.getBalance();
            return { errors, succeeds };
        });
    }
    clean() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    registerFiles(_a) {
        return __awaiter(this, arguments, void 0, function* ({ files, uuid }) {
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
                    date: nowS(),
                    data,
                    payload: _file.payload,
                };
                this.files_bridge[this.arweaveToID(arweave)] = _file;
            }
            return files.length;
        });
    }
    sync(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.owner != address) {
                return true;
            }
            return true;
        });
    }
    init(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const irys_network = (options === null || options === void 0 ? void 0 : options.arweave_rpc) || "https://arweave.devnet.irys.xyz";
            const rpc = (options === null || options === void 0 ? void 0 : options.rpc) || "https://api.devnet.solana.com";
            const wallet = yield this.generateWallet();
            if (!wallet)
                return false;
            this.wallet = wallet;
            const provider = {
                publicKey: wallet.publicKey,
                signMessage: (message) => __awaiter(this, void 0, void 0, function* () {
                    return nacl.sign.detached(message, this.wallet.secretKey);
                }),
            };
            this.owner = address;
            this.irys = new NodeIrys({
                // url: irys_network,
                token: "solana",
                key: wallet.secretKey,
                network: "devnet",
                config: { providerUrl: irys_network },
                // wallet: { rpcUrl: rpc, provider },
            });
            yield this.irys.ready();
            const to = yield this.irys.utils.getBundlerAddress("solana");
            const bal = yield this.getBalance();
            return true;
        });
    }
}
let global = null;
export const init = (address, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (global) {
        const g = yield global.sync(address);
        if (!g)
            global = null;
        return global;
    }
    global = new IrysHelper();
    const g = yield global.init(address, options);
    if (!g)
        global = null;
    return global;
});
