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
export class CollectorRegistry {
    constructor(fields) {
        this.class = fields.class;
        this.storeHash = fields.storeHash;
        this.creator = fields.creator;
        this.holder = fields.holder;
        this.currency = fields.currency;
        this.date = new types.IndexDate(Object.assign({}, fields.date));
        this.filters = fields.filters;
        this.track = new types.CollectTrack(Object.assign({}, fields.track));
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
        if (!data.slice(0, 8).equals(CollectorRegistry.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CollectorRegistry.layout.decode(data.slice(8));
        return new CollectorRegistry({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHash: dec.storeHash,
            creator: dec.creator,
            holder: dec.holder,
            currency: dec.currency,
            date: types.IndexDate.fromDecoded(dec.date),
            filters: dec.filters,
            track: types.CollectTrack.fromDecoded(dec.track),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHash: this.storeHash.toString(),
            creator: this.creator.toString(),
            holder: this.holder.toString(),
            currency: this.currency.toString(),
            date: this.date.toJSON(),
            filters: this.filters,
            track: this.track.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new CollectorRegistry({
            class: types.AccountClass.fromJSON(obj.class),
            storeHash: new BN(obj.storeHash),
            creator: new PublicKey(obj.creator),
            holder: new PublicKey(obj.holder),
            currency: new PublicKey(obj.currency),
            date: types.IndexDate.fromJSON(obj.date),
            filters: obj.filters,
            track: types.CollectTrack.fromJSON(obj.track),
        });
    }
}
CollectorRegistry.discriminator = Buffer.from([
    25, 164, 62, 184, 54, 145, 8, 211,
]);
CollectorRegistry.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("creator"),
    borsh.publicKey("holder"),
    borsh.publicKey("currency"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 4, "filters"),
    types.CollectTrack.layout("track"),
]);
