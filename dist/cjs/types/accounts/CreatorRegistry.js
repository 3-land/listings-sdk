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
exports.CreatorRegistry = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CreatorRegistry {
    constructor(fields) {
        this.class = fields.class;
        this.storeHash = fields.storeHash;
        this.currency = fields.currency;
        this.creator = fields.creator;
        this.donations = fields.donations;
        this.date = new types.IndexDate(Object.assign({}, fields.date));
        this.filters = fields.filters;
        this.track = new types.SaleTrack(Object.assign({}, fields.track));
        this.lut = fields.lut;
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
        if (!data.slice(0, 8).equals(CreatorRegistry.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CreatorRegistry.layout.decode(data.slice(8));
        return new CreatorRegistry({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHash: dec.storeHash,
            currency: dec.currency,
            creator: dec.creator,
            donations: dec.donations,
            date: types.IndexDate.fromDecoded(dec.date),
            filters: dec.filters,
            track: types.SaleTrack.fromDecoded(dec.track),
            lut: dec.lut,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHash: this.storeHash.toString(),
            currency: this.currency.toString(),
            creator: this.creator.toString(),
            donations: this.donations.toString(),
            date: this.date.toJSON(),
            filters: this.filters,
            track: this.track.toJSON(),
            lut: this.lut.toString(),
        };
    }
    static fromJSON(obj) {
        return new CreatorRegistry({
            class: types.AccountClass.fromJSON(obj.class),
            storeHash: new bn_js_1.default(obj.storeHash),
            currency: new web3_js_1.PublicKey(obj.currency),
            creator: new web3_js_1.PublicKey(obj.creator),
            donations: new bn_js_1.default(obj.donations),
            date: types.IndexDate.fromJSON(obj.date),
            filters: obj.filters,
            track: types.SaleTrack.fromJSON(obj.track),
            lut: new web3_js_1.PublicKey(obj.lut),
        });
    }
}
exports.CreatorRegistry = CreatorRegistry;
CreatorRegistry.discriminator = Buffer.from([
    14, 189, 133, 111, 190, 233, 2, 236,
]);
CreatorRegistry.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    borsh.u64("donations"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 8, "filters"),
    types.SaleTrack.layout("track"),
    borsh.publicKey("lut"),
]);
