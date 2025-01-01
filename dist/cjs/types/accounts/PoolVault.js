"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolVault = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class PoolVault {
    constructor(fields) {
        this.class = fields.class;
        this.state = fields.state;
        this.storeHash = fields.storeHash;
        this.currency = fields.currency;
        this.creator = fields.creator;
        this.poolType = fields.poolType;
        this.access = fields.access;
        this.deposit = fields.deposit;
        this.secured = fields.secured;
        this.decimals = fields.decimals;
        this.managers = fields.managers;
        this.name = fields.name;
    }
    static fetch(c_1, address_1) {
        return __awaiter(this, arguments, void 0, function* (c, address, programId = programId_1.PROGRAM_ID) {
            const info = yield c.getAccountInfo(address);
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static fetchMultiple(c_1, addresses_1) {
        return __awaiter(this, arguments, void 0, function* (c, addresses, programId = programId_1.PROGRAM_ID) {
            const infos = yield c.getMultipleAccountsInfo(addresses);
            return infos.map((info) => {
                if (info === null) {
                    return null;
                }
                if (!info.owner.equals(programId)) {
                    throw new Error("account doesn't belong to this program");
                }
                return this.decode(info.data);
            });
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(PoolVault.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PoolVault.layout.decode(data.slice(8));
        return new PoolVault({
            class: types.AccountClass.fromDecoded(dec.class),
            state: types.PoolState.fromDecoded(dec.state),
            storeHash: dec.storeHash,
            currency: dec.currency,
            creator: dec.creator,
            poolType: types.PoolType.fromDecoded(dec.poolType),
            access: types.PoolAccess.fromDecoded(dec.access),
            deposit: dec.deposit,
            secured: dec.secured,
            decimals: dec.decimals,
            managers: dec.managers,
            name: dec.name,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            state: this.state.toJSON(),
            storeHash: this.storeHash.toString(),
            currency: this.currency.toString(),
            creator: this.creator.toString(),
            poolType: this.poolType.toJSON(),
            access: this.access.toJSON(),
            deposit: this.deposit.toString(),
            secured: this.secured.toString(),
            decimals: this.decimals,
            managers: this.managers.map((item) => item.toString()),
            name: this.name,
        };
    }
    static fromJSON(obj) {
        return new PoolVault({
            class: types.AccountClass.fromJSON(obj.class),
            state: types.PoolState.fromJSON(obj.state),
            storeHash: new bn_js_1.default(obj.storeHash),
            currency: new web3_js_1.PublicKey(obj.currency),
            creator: new web3_js_1.PublicKey(obj.creator),
            poolType: types.PoolType.fromJSON(obj.poolType),
            access: types.PoolAccess.fromJSON(obj.access),
            deposit: new bn_js_1.default(obj.deposit),
            secured: new bn_js_1.default(obj.secured),
            decimals: obj.decimals,
            managers: obj.managers.map((item) => new web3_js_1.PublicKey(item)),
            name: obj.name,
        });
    }
}
exports.PoolVault = PoolVault;
PoolVault.discriminator = Buffer.from([
    9, 184, 204, 69, 231, 82, 252, 154,
]);
PoolVault.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PoolState.layout("state"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    types.PoolType.layout("poolType"),
    types.PoolAccess.layout("access"),
    borsh.u64("deposit"),
    borsh.u64("secured"),
    borsh.u8("decimals"),
    borsh.vec(borsh.publicKey(), "managers"),
    borsh.str("name"),
]);
