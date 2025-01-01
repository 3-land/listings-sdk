var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId";
export class CurrencyArtistProof {
    constructor(fields) {
        this.proofHash = fields.proofHash;
        this.amount = fields.amount;
        this.currencyVerifier = fields.currencyVerifier;
        this.artistVerifier = fields.artistVerifier;
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
        if (!data.slice(0, 8).equals(CurrencyArtistProof.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CurrencyArtistProof.layout.decode(data.slice(8));
        return new CurrencyArtistProof({
            proofHash: dec.proofHash,
            amount: dec.amount,
            currencyVerifier: dec.currencyVerifier,
            artistVerifier: dec.artistVerifier,
        });
    }
    toJSON() {
        return {
            proofHash: this.proofHash.toString(),
            amount: this.amount.toString(),
            currencyVerifier: this.currencyVerifier,
            artistVerifier: this.artistVerifier,
        };
    }
    static fromJSON(obj) {
        return new CurrencyArtistProof({
            proofHash: new BN(obj.proofHash),
            amount: new BN(obj.amount),
            currencyVerifier: obj.currencyVerifier,
            artistVerifier: obj.artistVerifier,
        });
    }
}
CurrencyArtistProof.discriminator = Buffer.from([
    11, 32, 176, 50, 245, 55, 208, 119,
]);
CurrencyArtistProof.layout = borsh.struct([
    borsh.u64("proofHash"),
    borsh.u64("amount"),
    borsh.u32("currencyVerifier"),
    borsh.u32("artistVerifier"),
]);
