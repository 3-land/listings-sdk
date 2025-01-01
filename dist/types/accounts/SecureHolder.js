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
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export class SecureHolder {
    constructor(fields) {
        this.class = fields.class;
        this.payload = new types.EncryptedPayload(Object.assign({}, fields.payload));
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
        if (!data.slice(0, 8).equals(SecureHolder.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = SecureHolder.layout.decode(data.slice(8));
        return new SecureHolder({
            class: types.AccountClass.fromDecoded(dec.class),
            payload: types.EncryptedPayload.fromDecoded(dec.payload),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            payload: this.payload.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new SecureHolder({
            class: types.AccountClass.fromJSON(obj.class),
            payload: types.EncryptedPayload.fromJSON(obj.payload),
        });
    }
}
SecureHolder.discriminator = Buffer.from([
    103, 104, 14, 27, 41, 183, 120, 21,
]);
SecureHolder.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.EncryptedPayload.layout("payload"),
]);
