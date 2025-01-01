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
export class BuyHistory {
    constructor(fields) {
        this.class = fields.class;
        this.buyType = fields.buyType;
        this.owner = fields.owner;
        this.item = fields.item;
        this.store = fields.store;
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
        if (!data.slice(0, 8).equals(BuyHistory.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BuyHistory.layout.decode(data.slice(8));
        return new BuyHistory({
            class: types.AccountClass.fromDecoded(dec.class),
            buyType: types.BuyHistoryClass.fromDecoded(dec.buyType),
            owner: dec.owner,
            item: dec.item,
            store: dec.store,
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            buyType: this.buyType.toJSON(),
            owner: this.owner.toString(),
            item: this.item.toString(),
            store: this.store.toString(),
        };
    }
    static fromJSON(obj) {
        return new BuyHistory({
            class: types.AccountClass.fromJSON(obj.class),
            buyType: types.BuyHistoryClass.fromJSON(obj.buyType),
            owner: new PublicKey(obj.owner),
            item: new PublicKey(obj.item),
            store: new PublicKey(obj.store),
        });
    }
}
BuyHistory.discriminator = Buffer.from([
    10, 217, 83, 243, 244, 164, 203, 202,
]);
BuyHistory.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.BuyHistoryClass.layout("buyType"),
    borsh.publicKey("owner"),
    borsh.publicKey("item"),
    borsh.publicKey("store"),
]);
