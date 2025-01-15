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
exports.Pack = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class Pack {
    constructor(fields) {
        this.class = fields.class;
        this.globalState = fields.globalState;
        this.holder = fields.holder;
        this.creator = fields.creator;
        this.createdHour = fields.createdHour;
        this.createdDates = new types.IndexDateNoHour({ ...fields.createdDates });
        this.activityHour = fields.activityHour;
        this.activityDates = new types.IndexDateNoHour({ ...fields.activityDates });
        this.category = new types.Category({ ...fields.category });
        this.superCategory = new types.SuperCategory({ ...fields.superCategory });
        this.eventCategory = fields.eventCategory;
        this.trackType = fields.trackType;
        this.mainCurrencyHash = fields.mainCurrencyHash;
        this.state = fields.state;
        this.supply = fields.supply;
        this.createdPieces = fields.createdPieces;
        this.popularity = new types.Popularity({ ...fields.popularity });
        this.filtering = new types.Filter({ ...fields.filtering });
        this.page = fields.page;
        this.manager = fields.manager;
        this.extra = fields.extra;
        this.item = new types.Item({ ...fields.item });
        this.count = fields.count;
        this.live = fields.live;
        this.available = fields.available;
        this.printed = fields.printed;
        this.saleConfig = new types.SaleConfig({ ...fields.saleConfig });
        this.opened = fields.opened;
        this.owed = fields.owed;
        this.identifier = fields.identifier;
        this.hash = fields.hash;
        this.hashTraits = fields.hashTraits;
        this.packConfig = new types.PackConfig({ ...fields.packConfig });
        this.volume = fields.volume.map((item) => new types.FakeVolumeTrack({ ...item }));
        this.delegate = fields.delegate;
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
        if (!data.slice(0, 8).equals(Pack.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = Pack.layout.decode(data.slice(8));
        return new Pack({
            class: types.AccountClass.fromDecoded(dec.class),
            globalState: types.GlobalState.fromDecoded(dec.globalState),
            holder: dec.holder,
            creator: dec.creator,
            createdHour: dec.createdHour,
            createdDates: types.IndexDateNoHour.fromDecoded(dec.createdDates),
            activityHour: dec.activityHour,
            activityDates: types.IndexDateNoHour.fromDecoded(dec.activityDates),
            category: types.Category.fromDecoded(dec.category),
            superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
            eventCategory: dec.eventCategory,
            trackType: types.TrackRegistry.fromDecoded(dec.trackType),
            mainCurrencyHash: dec.mainCurrencyHash,
            state: types.ItemState.fromDecoded(dec.state),
            supply: dec.supply,
            createdPieces: dec.createdPieces,
            popularity: types.Popularity.fromDecoded(dec.popularity),
            filtering: types.Filter.fromDecoded(dec.filtering),
            page: dec.page,
            manager: dec.manager,
            extra: dec.extra,
            item: types.Item.fromDecoded(dec.item),
            count: dec.count,
            live: dec.live,
            available: dec.available,
            printed: dec.printed,
            saleConfig: types.SaleConfig.fromDecoded(dec.saleConfig),
            opened: dec.opened,
            owed: dec.owed,
            identifier: dec.identifier,
            hash: dec.hash,
            hashTraits: dec.hashTraits,
            packConfig: types.PackConfig.fromDecoded(dec.packConfig),
            volume: dec.volume.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.FakeVolumeTrack.fromDecoded(item)),
            delegate: dec.delegate,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            globalState: this.globalState.toJSON(),
            holder: this.holder.toString(),
            creator: this.creator.toString(),
            createdHour: this.createdHour,
            createdDates: this.createdDates.toJSON(),
            activityHour: this.activityHour,
            activityDates: this.activityDates.toJSON(),
            category: this.category.toJSON(),
            superCategory: this.superCategory.toJSON(),
            eventCategory: this.eventCategory,
            trackType: this.trackType.toJSON(),
            mainCurrencyHash: this.mainCurrencyHash.toString(),
            state: this.state.toJSON(),
            supply: this.supply.toString(),
            createdPieces: this.createdPieces.toString(),
            popularity: this.popularity.toJSON(),
            filtering: this.filtering.toJSON(),
            page: this.page.toString(),
            manager: this.manager.toString(),
            extra: this.extra,
            item: this.item.toJSON(),
            count: this.count.toString(),
            live: this.live.toString(),
            available: this.available.toString(),
            printed: this.printed.toString(),
            saleConfig: this.saleConfig.toJSON(),
            opened: this.opened.toString(),
            owed: this.owed.toString(),
            identifier: this.identifier.toString(),
            hash: this.hash.toString(),
            hashTraits: this.hashTraits.toString(),
            packConfig: this.packConfig.toJSON(),
            volume: this.volume.map((item) => item.toJSON()),
            delegate: this.delegate.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new Pack({
            class: types.AccountClass.fromJSON(obj.class),
            globalState: types.GlobalState.fromJSON(obj.globalState),
            holder: new web3_js_1.PublicKey(obj.holder),
            creator: new web3_js_1.PublicKey(obj.creator),
            createdHour: obj.createdHour,
            createdDates: types.IndexDateNoHour.fromJSON(obj.createdDates),
            activityHour: obj.activityHour,
            activityDates: types.IndexDateNoHour.fromJSON(obj.activityDates),
            category: types.Category.fromJSON(obj.category),
            superCategory: types.SuperCategory.fromJSON(obj.superCategory),
            eventCategory: obj.eventCategory,
            trackType: types.TrackRegistry.fromJSON(obj.trackType),
            mainCurrencyHash: new bn_js_1.default(obj.mainCurrencyHash),
            state: types.ItemState.fromJSON(obj.state),
            supply: new bn_js_1.default(obj.supply),
            createdPieces: new bn_js_1.default(obj.createdPieces),
            popularity: types.Popularity.fromJSON(obj.popularity),
            filtering: types.Filter.fromJSON(obj.filtering),
            page: new bn_js_1.default(obj.page),
            manager: new web3_js_1.PublicKey(obj.manager),
            extra: obj.extra,
            item: types.Item.fromJSON(obj.item),
            count: new bn_js_1.default(obj.count),
            live: new bn_js_1.default(obj.live),
            available: new bn_js_1.default(obj.available),
            printed: new bn_js_1.default(obj.printed),
            saleConfig: types.SaleConfig.fromJSON(obj.saleConfig),
            opened: new bn_js_1.default(obj.opened),
            owed: new bn_js_1.default(obj.owed),
            identifier: new bn_js_1.default(obj.identifier),
            hash: new bn_js_1.default(obj.hash),
            hashTraits: new bn_js_1.default(obj.hashTraits),
            packConfig: types.PackConfig.fromJSON(obj.packConfig),
            volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
            delegate: obj.delegate.map((item) => new web3_js_1.PublicKey(item)),
        });
    }
}
exports.Pack = Pack;
Pack.discriminator = Buffer.from([
    244, 192, 97, 212, 134, 91, 198, 200,
]);
Pack.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    borsh.u32("createdHour"),
    types.IndexDateNoHour.layout("createdDates"),
    borsh.u32("activityHour"),
    types.IndexDateNoHour.layout("activityDates"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    types.ItemState.layout("state"),
    borsh.u64("supply"),
    borsh.u64("createdPieces"),
    types.Popularity.layout("popularity"),
    types.Filter.layout("filtering"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.array(borsh.u8(), 8, "extra"),
    types.Item.layout("item"),
    borsh.u64("count"),
    borsh.u64("live"),
    borsh.u64("available"),
    borsh.u64("printed"),
    types.SaleConfig.layout("saleConfig"),
    borsh.u64("opened"),
    borsh.u64("owed"),
    borsh.u64("identifier"),
    borsh.u64("hash"),
    borsh.u64("hashTraits"),
    types.PackConfig.layout("packConfig"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
    borsh.vec(borsh.publicKey(), "delegate"),
]);
//# sourceMappingURL=Pack.js.map