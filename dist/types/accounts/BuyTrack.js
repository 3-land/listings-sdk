var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export class BuyTrack {
    constructor(fields) {
        this.count = fields.count;
        this.time = fields.time;
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
        if (!data.slice(0, 8).equals(BuyTrack.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BuyTrack.layout.decode(data.slice(8));
        return new BuyTrack({
            count: dec.count,
            time: dec.time,
        });
    }
    toJSON() {
        return {
            count: this.count,
            time: this.time,
        };
    }
    static fromJSON(obj) {
        return new BuyTrack({
            count: obj.count,
            time: obj.time,
        });
    }
}
BuyTrack.discriminator = Buffer.from([
    127, 195, 236, 128, 20, 28, 179, 140,
]);
BuyTrack.layout = borsh.struct([borsh.u32("count"), borsh.u32("time")]);
