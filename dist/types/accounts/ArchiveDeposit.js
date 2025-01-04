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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveDeposit = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class ArchiveDeposit {
    constructor(fields) {
        this.class = fields.class;
        this.identifier = fields.identifier;
        this.creator = fields.creator;
        this.dates = new types.IndexDates({ ...fields.dates });
        this.holder = fields.holder;
        this.category = new types.Category({ ...fields.category });
        this.superCategory = new types.SuperCategory({ ...fields.superCategory });
        this.eventCategory = fields.eventCategory;
        this.hash = fields.hash;
        this.manager = fields.manager;
        this.metadata = new types.MetadataArgs({ ...fields.metadata });
        this.supply = fields.supply;
        this.trackType = fields.trackType;
        this.mainCurrencyHash = fields.mainCurrencyHash;
        this.volume = fields.volume.map((item) => new types.FakeVolumeTrack({ ...item }));
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(ArchiveDeposit.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = ArchiveDeposit.layout.decode(data.slice(8));
        return new ArchiveDeposit({
            class: types.AccountClass.fromDecoded(dec.class),
            identifier: dec.identifier,
            creator: dec.creator,
            dates: types.IndexDates.fromDecoded(dec.dates),
            holder: dec.holder,
            category: types.Category.fromDecoded(dec.category),
            superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
            eventCategory: dec.eventCategory,
            hash: dec.hash,
            manager: dec.manager,
            metadata: types.MetadataArgs.fromDecoded(dec.metadata),
            supply: dec.supply,
            trackType: types.TrackRegistry.fromDecoded(dec.trackType),
            mainCurrencyHash: dec.mainCurrencyHash,
            volume: dec.volume.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.FakeVolumeTrack.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            identifier: this.identifier.toString(),
            creator: this.creator.toString(),
            dates: this.dates.toJSON(),
            holder: this.holder.toString(),
            category: this.category.toJSON(),
            superCategory: this.superCategory.toJSON(),
            eventCategory: this.eventCategory,
            hash: this.hash.toString(),
            manager: this.manager.toString(),
            metadata: this.metadata.toJSON(),
            supply: this.supply.toString(),
            trackType: this.trackType.toJSON(),
            mainCurrencyHash: this.mainCurrencyHash.toString(),
            volume: this.volume.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new ArchiveDeposit({
            class: types.AccountClass.fromJSON(obj.class),
            identifier: new bn_js_1.default(obj.identifier),
            creator: new web3_js_1.PublicKey(obj.creator),
            dates: types.IndexDates.fromJSON(obj.dates),
            holder: new web3_js_1.PublicKey(obj.holder),
            category: types.Category.fromJSON(obj.category),
            superCategory: types.SuperCategory.fromJSON(obj.superCategory),
            eventCategory: obj.eventCategory,
            hash: new bn_js_1.default(obj.hash),
            manager: new web3_js_1.PublicKey(obj.manager),
            metadata: types.MetadataArgs.fromJSON(obj.metadata),
            supply: new bn_js_1.default(obj.supply),
            trackType: types.TrackRegistry.fromJSON(obj.trackType),
            mainCurrencyHash: new bn_js_1.default(obj.mainCurrencyHash),
            volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
        });
    }
}
exports.ArchiveDeposit = ArchiveDeposit;
ArchiveDeposit.discriminator = Buffer.from([
    145, 231, 133, 253, 101, 203, 61, 166,
]);
ArchiveDeposit.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("identifier"),
    borsh.publicKey("creator"),
    types.IndexDates.layout("dates"),
    borsh.publicKey("holder"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    borsh.u64("hash"),
    borsh.publicKey("manager"),
    types.MetadataArgs.layout("metadata"),
    borsh.u64("supply"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
]);
//# sourceMappingURL=ArchiveDeposit.js.map