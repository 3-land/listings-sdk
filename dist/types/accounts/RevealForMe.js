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
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export class RevealForMe {
    constructor(fields) {
        this.class = fields.class;
        this.storeHalfHash = fields.storeHalfHash;
        this.state = fields.state;
        this.creator = fields.creator;
        this.nft = fields.nft;
        this.random = fields.random;
        this.data = fields.data;
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
        if (!data.slice(0, 8).equals(RevealForMe.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = RevealForMe.layout.decode(data.slice(8));
        return new RevealForMe({
            class: types.AccountClass.fromDecoded(dec.class),
            storeHalfHash: dec.storeHalfHash,
            state: dec.state,
            creator: dec.creator,
            nft: dec.nft,
            random: dec.random,
            data: new Uint8Array(dec.data.buffer, dec.data.byteOffset, dec.data.length),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            storeHalfHash: this.storeHalfHash,
            state: this.state,
            creator: this.creator.toString(),
            nft: this.nft.toString(),
            random: this.random,
            data: Array.from(this.data.values()),
        };
    }
    static fromJSON(obj) {
        return new RevealForMe({
            class: types.AccountClass.fromJSON(obj.class),
            storeHalfHash: obj.storeHalfHash,
            state: obj.state,
            creator: new PublicKey(obj.creator),
            nft: new PublicKey(obj.nft),
            random: obj.random,
            data: Uint8Array.from(obj.data),
        });
    }
}
RevealForMe.discriminator = Buffer.from([5, 57, 21, 62, 5, 138, 252, 237]);
RevealForMe.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.array(borsh.u8(), 4, "storeHalfHash"),
    borsh.u8("state"),
    borsh.publicKey("creator"),
    borsh.publicKey("nft"),
    borsh.u16("random"),
    borsh.vecU8("data"),
]);
