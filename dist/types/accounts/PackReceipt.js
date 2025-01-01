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
export class PackReceipt {
    constructor(fields) {
        this.class = fields.class;
        this.cnft = fields.cnft;
        this.pack = fields.pack;
        this.creator = fields.creator;
        this.state = fields.state;
        this.cardsInside = fields.cardsInside;
        this.slot = fields.slot;
        this.created = fields.created;
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
        if (!data.slice(0, 8).equals(PackReceipt.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackReceipt.layout.decode(data.slice(8));
        return new PackReceipt({
            class: types.AccountClass.fromDecoded(dec.class),
            cnft: dec.cnft,
            pack: dec.pack,
            creator: dec.creator,
            state: types.PackState.fromDecoded(dec.state),
            cardsInside: dec.cardsInside,
            slot: dec.slot,
            created: dec.created,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            cnft: this.cnft.toString(),
            pack: this.pack.toString(),
            creator: this.creator.toString(),
            state: this.state.toJSON(),
            cardsInside: this.cardsInside,
            slot: this.slot.toString(),
            created: this.created,
        };
    }
    static fromJSON(obj) {
        return new PackReceipt({
            class: types.AccountClass.fromJSON(obj.class),
            cnft: new PublicKey(obj.cnft),
            pack: new PublicKey(obj.pack),
            creator: new PublicKey(obj.creator),
            state: types.PackState.fromJSON(obj.state),
            cardsInside: obj.cardsInside,
            slot: new BN(obj.slot),
            created: obj.created,
        });
    }
}
PackReceipt.discriminator = Buffer.from([
    117, 14, 250, 166, 162, 131, 180, 180,
]);
PackReceipt.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("cnft"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    types.PackState.layout("state"),
    borsh.u8("cardsInside"),
    borsh.u64("slot"),
    borsh.u32("created"),
]);
