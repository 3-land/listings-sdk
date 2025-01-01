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
import { PROGRAM_ID } from "../programId";
export class BurnProgress {
    constructor(fields) {
        this.id = fields.id;
        this.burns = fields.burns;
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
        if (!data.slice(0, 8).equals(BurnProgress.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BurnProgress.layout.decode(data.slice(8));
        return new BurnProgress({
            id: dec.id,
            burns: dec.burns,
        });
    }
    toJSON() {
        return {
            id: this.id,
            burns: this.burns.toString(),
        };
    }
    static fromJSON(obj) {
        return new BurnProgress({
            id: obj.id,
            burns: new PublicKey(obj.burns),
        });
    }
}
BurnProgress.discriminator = Buffer.from([
    12, 198, 91, 240, 229, 209, 22, 141,
]);
BurnProgress.layout = borsh.struct([
    borsh.u16("id"),
    borsh.publicKey("burns"),
]);
