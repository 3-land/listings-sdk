var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export class Pack {
    constructor(fields) {
        this.class = fields.class;
        this.globalState = fields.globalState;
        this.holder = fields.holder;
        this.creator = fields.creator;
        this.dates = new types.IndexDates(Object.assign({}, fields.dates));
        this.category = new types.Category(Object.assign({}, fields.category));
        this.superCategory = new types.SuperCategory(Object.assign({}, fields.superCategory));
        this.eventCategory = fields.eventCategory;
        this.trackType = fields.trackType;
        this.mainCurrencyHash = fields.mainCurrencyHash;
        this.track = new types.ItemTrack(Object.assign({}, fields.track));
        this.popularity = new types.Popularity(Object.assign({}, fields.popularity));
        this.filtering = new types.Filter(Object.assign({}, fields.filtering));
        this.page = fields.page;
        this.manager = fields.manager;
        this.isServerless = fields.isServerless;
        this.availableOption = fields.availableOption;
        this.hasWrappedTokens = fields.hasWrappedTokens;
        this.burntPieces = fields.burntPieces;
        this.flag = fields.flag;
        this.item = new types.Item(Object.assign({}, fields.item));
        this.count = fields.count;
        this.live = fields.live;
        this.available = fields.available;
        this.printed = fields.printed;
        this.saleConfig = new types.SaleConfig(Object.assign({}, fields.saleConfig));
        this.opened = fields.opened;
        this.owed = fields.owed;
        this.identifier = fields.identifier;
        this.hash = fields.hash;
        this.hashTraits = fields.hashTraits;
        this.packConfig = new types.PackConfig(Object.assign({}, fields.packConfig));
        this.volume = fields.volume.map((item) => new types.FakeVolumeTrack(Object.assign({}, item)));
        this.delegate = fields.delegate;
        this.extra = fields.extra;
    }
    static fetch(c_1, address_1) {
        return __awaiter(this, arguments, void 0, function* (c, address, programId = PROGRAM_ID) {
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
        return __awaiter(this, arguments, void 0, function* (c, addresses, programId = PROGRAM_ID) {
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
        if (!data.slice(0, 8).equals(Pack.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = Pack.layout.decode(data.slice(8));
        return new Pack({
            class: types.AccountClass.fromDecoded(dec.class),
            globalState: types.GlobalState.fromDecoded(dec.globalState),
            holder: dec.holder,
            creator: dec.creator,
            dates: types.IndexDates.fromDecoded(dec.dates),
            category: types.Category.fromDecoded(dec.category),
            superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
            eventCategory: dec.eventCategory,
            trackType: types.TrackRegistry.fromDecoded(dec.trackType),
            mainCurrencyHash: dec.mainCurrencyHash,
            track: types.ItemTrack.fromDecoded(dec.track),
            popularity: types.Popularity.fromDecoded(dec.popularity),
            filtering: types.Filter.fromDecoded(dec.filtering),
            page: dec.page,
            manager: dec.manager,
            isServerless: dec.isServerless,
            availableOption: dec.availableOption,
            hasWrappedTokens: dec.hasWrappedTokens,
            burntPieces: dec.burntPieces,
            flag: dec.flag,
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
            extra: dec.extra,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            globalState: this.globalState.toJSON(),
            holder: this.holder.toString(),
            creator: this.creator.toString(),
            dates: this.dates.toJSON(),
            category: this.category.toJSON(),
            superCategory: this.superCategory.toJSON(),
            eventCategory: this.eventCategory,
            trackType: this.trackType.toJSON(),
            mainCurrencyHash: this.mainCurrencyHash.toString(),
            track: this.track.toJSON(),
            popularity: this.popularity.toJSON(),
            filtering: this.filtering.toJSON(),
            page: this.page.toString(),
            manager: this.manager.toString(),
            isServerless: this.isServerless,
            availableOption: this.availableOption,
            hasWrappedTokens: this.hasWrappedTokens,
            burntPieces: this.burntPieces,
            flag: this.flag,
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
            extra: this.extra,
        };
    }
    static fromJSON(obj) {
        return new Pack({
            class: types.AccountClass.fromJSON(obj.class),
            globalState: types.GlobalState.fromJSON(obj.globalState),
            holder: new PublicKey(obj.holder),
            creator: new PublicKey(obj.creator),
            dates: types.IndexDates.fromJSON(obj.dates),
            category: types.Category.fromJSON(obj.category),
            superCategory: types.SuperCategory.fromJSON(obj.superCategory),
            eventCategory: obj.eventCategory,
            trackType: types.TrackRegistry.fromJSON(obj.trackType),
            mainCurrencyHash: new BN(obj.mainCurrencyHash),
            track: types.ItemTrack.fromJSON(obj.track),
            popularity: types.Popularity.fromJSON(obj.popularity),
            filtering: types.Filter.fromJSON(obj.filtering),
            page: new BN(obj.page),
            manager: new PublicKey(obj.manager),
            isServerless: obj.isServerless,
            availableOption: obj.availableOption,
            hasWrappedTokens: obj.hasWrappedTokens,
            burntPieces: obj.burntPieces,
            flag: obj.flag,
            item: types.Item.fromJSON(obj.item),
            count: new BN(obj.count),
            live: new BN(obj.live),
            available: new BN(obj.available),
            printed: new BN(obj.printed),
            saleConfig: types.SaleConfig.fromJSON(obj.saleConfig),
            opened: new BN(obj.opened),
            owed: new BN(obj.owed),
            identifier: new BN(obj.identifier),
            hash: new BN(obj.hash),
            hashTraits: new BN(obj.hashTraits),
            packConfig: types.PackConfig.fromJSON(obj.packConfig),
            volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
            delegate: obj.delegate.map((item) => new PublicKey(item)),
            extra: obj.extra,
        });
    }
}
Pack.discriminator = Buffer.from([
    244, 192, 97, 212, 134, 91, 198, 200,
]);
Pack.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    types.IndexDates.layout("dates"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    types.ItemTrack.layout("track"),
    types.Popularity.layout("popularity"),
    types.Filter.layout("filtering"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.u8("isServerless"),
    borsh.u8("availableOption"),
    borsh.u8("hasWrappedTokens"),
    borsh.u32("burntPieces"),
    borsh.array(borsh.u8(), 1, "flag"),
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
    borsh.array(borsh.u8(), 4, "extra"),
]);
