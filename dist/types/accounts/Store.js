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
export class Store {
    constructor(fields) {
        this.class = fields.class;
        this.holder = fields.holder;
        this.creator = fields.creator;
        this.page = fields.page;
        this.count = fields.count;
        this.live = fields.live;
        this.name = fields.name;
        this.config = new types.StoreConfig(Object.assign({}, fields.config));
        this.storeId = fields.storeId;
        this.globalFee =
            (fields.globalFee && new types.GlobalFee(Object.assign({}, fields.globalFee))) || null;
        this.globalDeposit = fields.globalDeposit;
        this.cacheHolder = fields.cacheHolder;
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
        if (!data.slice(0, 8).equals(Store.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = Store.layout.decode(data.slice(8));
        return new Store({
            class: types.AccountClass.fromDecoded(dec.class),
            holder: dec.holder,
            creator: dec.creator,
            page: dec.page,
            count: dec.count,
            live: dec.live,
            name: dec.name,
            config: types.StoreConfig.fromDecoded(dec.config),
            storeId: dec.storeId,
            globalFee: (dec.globalFee && types.GlobalFee.fromDecoded(dec.globalFee)) || null,
            globalDeposit: dec.globalDeposit,
            cacheHolder: dec.cacheHolder,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            holder: this.holder.toString(),
            creator: this.creator.toString(),
            page: this.page.toString(),
            count: this.count.toString(),
            live: this.live.toString(),
            name: this.name,
            config: this.config.toJSON(),
            storeId: this.storeId,
            globalFee: (this.globalFee && this.globalFee.toJSON()) || null,
            globalDeposit: this.globalDeposit.toString(),
            cacheHolder: this.cacheHolder,
        };
    }
    static fromJSON(obj) {
        return new Store({
            class: types.AccountClass.fromJSON(obj.class),
            holder: new PublicKey(obj.holder),
            creator: new PublicKey(obj.creator),
            page: new BN(obj.page),
            count: new BN(obj.count),
            live: new BN(obj.live),
            name: obj.name,
            config: types.StoreConfig.fromJSON(obj.config),
            storeId: obj.storeId,
            globalFee: (obj.globalFee && types.GlobalFee.fromJSON(obj.globalFee)) || null,
            globalDeposit: new BN(obj.globalDeposit),
            cacheHolder: obj.cacheHolder,
        });
    }
}
Store.discriminator = Buffer.from([
    130, 48, 247, 244, 182, 191, 30, 26,
]);
Store.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    borsh.u64("page"),
    borsh.u64("count"),
    borsh.u64("live"),
    borsh.str("name"),
    types.StoreConfig.layout("config"),
    borsh.u16("storeId"),
    borsh.option(types.GlobalFee.layout(), "globalFee"),
    borsh.u64("globalDeposit"),
    borsh.array(borsh.u8(), 128, "cacheHolder"),
]);
