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
export class PackTraits {
    constructor(fields) {
        this.class = fields.class;
        this.list = fields.list;
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
        if (!data.slice(0, 8).equals(PackTraits.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackTraits.layout.decode(data.slice(8));
        return new PackTraits({
            class: types.AccountClass.fromDecoded(dec.class),
            list: dec.list.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.TraitType.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            list: this.list.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PackTraits({
            class: types.AccountClass.fromJSON(obj.class),
            list: obj.list.map((item) => types.TraitType.fromJSON(item)),
        });
    }
}
PackTraits.discriminator = Buffer.from([
    238, 139, 229, 97, 133, 123, 168, 248,
]);
PackTraits.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.vec(types.TraitType.layout(), "list"),
]);
