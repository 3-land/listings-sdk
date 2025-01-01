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
export class PackOpenHolder {
    constructor(fields) {
        this.class = fields.class;
        this.state = fields.state;
        this.pack = fields.pack;
        this.creator = fields.creator;
        this.claimer = fields.claimer;
        this.packType = fields.packType;
        this.items = fields.items.map((item) => new types.SelectedCard(Object.assign({}, item)));
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
        if (!data.slice(0, 8).equals(PackOpenHolder.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = PackOpenHolder.layout.decode(data.slice(8));
        return new PackOpenHolder({
            class: types.AccountClass.fromDecoded(dec.class),
            state: types.PackOpenHolderState.fromDecoded(dec.state),
            pack: dec.pack,
            creator: dec.creator,
            claimer: dec.claimer,
            packType: types.PackType.fromDecoded(dec.packType),
            items: dec.items.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.SelectedCard.fromDecoded(item)),
        });
    }
    toJSON() {
        return {
            class: this.class.toJSON(),
            state: this.state.toJSON(),
            pack: this.pack.toString(),
            creator: this.creator.toString(),
            claimer: this.claimer.toString(),
            packType: this.packType.toJSON(),
            items: this.items.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new PackOpenHolder({
            class: types.AccountClass.fromJSON(obj.class),
            state: types.PackOpenHolderState.fromJSON(obj.state),
            pack: new PublicKey(obj.pack),
            creator: new PublicKey(obj.creator),
            claimer: new PublicKey(obj.claimer),
            packType: types.PackType.fromJSON(obj.packType),
            items: obj.items.map((item) => types.SelectedCard.fromJSON(item)),
        });
    }
}
PackOpenHolder.discriminator = Buffer.from([
    54, 190, 160, 171, 255, 212, 144, 120,
]);
PackOpenHolder.layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PackOpenHolderState.layout("state"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    borsh.publicKey("claimer"),
    types.PackType.layout("packType"),
    borsh.vec(types.SelectedCard.layout(), "items"),
]);
