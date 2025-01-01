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
export class CreatorRegistry {
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
            storeHash: new BN(obj.storeHash),
            currency: new PublicKey(obj.currency),
            creator: new PublicKey(obj.creator),
            donations: new BN(obj.donations),
            date: types.IndexDate.fromJSON(obj.date),
            filters: obj.filters,
            track: types.SaleTrack.fromJSON(obj.track),
            lut: new PublicKey(obj.lut),
        });
    }
}
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
