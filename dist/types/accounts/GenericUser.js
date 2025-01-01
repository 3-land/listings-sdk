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
export class GenericUser {
    constructor(fields) {
        this.class = fields.class;
        this.subApp = fields.subApp;
        this.holderHash = fields.holderHash;
        this.category = fields.category;
        this.creator = fields.creator;
        this.lutAccount = fields.lutAccount;
        this.subWallets = fields.subWallets;
        this.extended = fields.extended;
        this.flags = fields.flags;
        this.username = fields.username;
        this.genericStore = fields.genericStore.map((item) => new types.GenericStore(Object.assign({}, item)));
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
        if (!data.slice(0, 8).equals(GenericUser.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = GenericUser.layout.decode(data.slice(8));
        return new GenericUser({
            class: types.AccountClass.fromDecoded(dec.class),
            subApp: dec.subApp,
            holderHash: dec.holderHash,
            category: dec.category,
            creator: dec.creator,
            lutAccount: dec.lutAccount,
            subWallets: dec.subWallets,
            extended: dec.extended,
            flags: dec.flags,
            username: dec.username,
            genericStore: dec.genericStore.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.GenericStore.fromDecoded(item)),
            extra: dec.extra,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            subApp: this.subApp.toString(),
            holderHash: this.holderHash.toString(),
            category: this.category.toString(),
            creator: this.creator.toString(),
            lutAccount: this.lutAccount.toString(),
            subWallets: this.subWallets.map((item) => item.toString()),
            extended: this.extended,
            flags: this.flags,
            username: this.username,
            genericStore: this.genericStore.map((item) => item.toJSON()),
            extra: this.extra,
        };
    }
    static fromJSON(obj) {
        return new GenericUser({
            class: types.AccountClass.fromJSON(obj.class),
            subApp: new BN(obj.subApp),
            holderHash: new BN(obj.holderHash),
            category: new BN(obj.category),
            creator: new PublicKey(obj.creator),
            lutAccount: new PublicKey(obj.lutAccount),
            subWallets: obj.subWallets.map((item) => new PublicKey(item)),
            extended: obj.extended,
            flags: obj.flags,
            username: obj.username,
            genericStore: obj.genericStore.map((item) => types.GenericStore.fromJSON(item)),
            extra: obj.extra,
        });
    }
}
GenericUser.discriminator = Buffer.from([
    222, 233, 191, 5, 55, 3, 237, 241,
]);
GenericUser.layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("subApp"),
    borsh.u64("holderHash"),
    borsh.u64("category"),
    borsh.publicKey("creator"),
    borsh.publicKey("lutAccount"),
    borsh.vec(borsh.publicKey(), "subWallets"),
    borsh.u8("extended"),
    borsh.array(borsh.u8(), 8, "flags"),
    borsh.str("username"),
    borsh.vec(types.GenericStore.layout(), "genericStore"),
    borsh.array(borsh.u8(), 32, "extra"),
]);
