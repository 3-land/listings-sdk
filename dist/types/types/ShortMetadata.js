import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class ShortMetadata {
    constructor(fields) {
        this.index = fields.index;
        this.supply = fields.supply;
        this.traitHash = fields.traitHash;
        this.name = fields.name;
        this.arweave = fields.arweave;
        this.traitPass =
            (fields.traitPass && new types.TraitPass(Object.assign({}, fields.traitPass))) || null;
        this.royalty = fields.royalty;
        this.creators =
            (fields.creators &&
                fields.creators.map((item) => new types.ShortCreator(Object.assign({}, item)))) ||
                null;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("index"),
            borsh.option(borsh.u64(), "supply"),
            borsh.u64("traitHash"),
            borsh.str("name"),
            borsh.str("arweave"),
            borsh.option(types.TraitPass.layout(), "traitPass"),
            borsh.option(borsh.u16(), "royalty"),
            borsh.option(borsh.vec(types.ShortCreator.layout()), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ShortMetadata({
            index: obj.index,
            supply: obj.supply,
            traitHash: obj.traitHash,
            name: obj.name,
            arweave: obj.arweave,
            traitPass: (obj.traitPass && types.TraitPass.fromDecoded(obj.traitPass)) || null,
            royalty: obj.royalty,
            creators: (obj.creators &&
                obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ShortCreator.fromDecoded(item))) ||
                null,
        });
    }
    static toEncodable(fields) {
        return {
            index: fields.index,
            supply: fields.supply,
            traitHash: fields.traitHash,
            name: fields.name,
            arweave: fields.arweave,
            traitPass: (fields.traitPass && types.TraitPass.toEncodable(fields.traitPass)) ||
                null,
            royalty: fields.royalty,
            creators: (fields.creators &&
                fields.creators.map((item) => types.ShortCreator.toEncodable(item))) ||
                null,
        };
    }
    toJSON() {
        return {
            index: this.index,
            supply: (this.supply && this.supply.toString()) || null,
            traitHash: this.traitHash.toString(),
            name: this.name,
            arweave: this.arweave,
            traitPass: (this.traitPass && this.traitPass.toJSON()) || null,
            royalty: this.royalty,
            creators: (this.creators && this.creators.map((item) => item.toJSON())) || null,
        };
    }
    static fromJSON(obj) {
        return new ShortMetadata({
            index: obj.index,
            supply: (obj.supply && new BN(obj.supply)) || null,
            traitHash: new BN(obj.traitHash),
            name: obj.name,
            arweave: obj.arweave,
            traitPass: (obj.traitPass && types.TraitPass.fromJSON(obj.traitPass)) || null,
            royalty: obj.royalty,
            creators: (obj.creators &&
                obj.creators.map((item) => types.ShortCreator.fromJSON(item))) ||
                null,
        });
    }
    toEncodable() {
        return ShortMetadata.toEncodable(this);
    }
}
