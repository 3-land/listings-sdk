import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class MetadataArgs {
    constructor(fields) {
        this.name = fields.name;
        this.symbol = fields.symbol;
        this.uri = fields.uri;
        this.sellerFeeBasisPoints = fields.sellerFeeBasisPoints;
        this.primarySaleHappened = fields.primarySaleHappened;
        this.isMutable = fields.isMutable;
        this.editionNonce = fields.editionNonce;
        this.tokenStandard = fields.tokenStandard;
        this.collection =
            (fields.collection && new types.Collection(Object.assign({}, fields.collection))) ||
                null;
        this.uses = (fields.uses && new types.Uses(Object.assign({}, fields.uses))) || null;
        this.tokenProgramVersion = fields.tokenProgramVersion;
        this.creators = fields.creators.map((item) => new types.Creator(Object.assign({}, item)));
    }
    static layout(property) {
        return borsh.struct([
            borsh.str("name"),
            borsh.str("symbol"),
            borsh.str("uri"),
            borsh.u16("sellerFeeBasisPoints"),
            borsh.bool("primarySaleHappened"),
            borsh.bool("isMutable"),
            borsh.option(borsh.u8(), "editionNonce"),
            borsh.option(types.TokenStandard.layout(), "tokenStandard"),
            borsh.option(types.Collection.layout(), "collection"),
            borsh.option(types.Uses.layout(), "uses"),
            types.TokenProgramVersion.layout("tokenProgramVersion"),
            borsh.vec(types.Creator.layout(), "creators"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MetadataArgs({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
            primarySaleHappened: obj.primarySaleHappened,
            isMutable: obj.isMutable,
            editionNonce: obj.editionNonce,
            tokenStandard: (obj.tokenStandard &&
                types.TokenStandard.fromDecoded(obj.tokenStandard)) ||
                null,
            collection: (obj.collection && types.Collection.fromDecoded(obj.collection)) ||
                null,
            uses: (obj.uses && types.Uses.fromDecoded(obj.uses)) || null,
            tokenProgramVersion: types.TokenProgramVersion.fromDecoded(obj.tokenProgramVersion),
            creators: obj.creators.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            symbol: fields.symbol,
            uri: fields.uri,
            sellerFeeBasisPoints: fields.sellerFeeBasisPoints,
            primarySaleHappened: fields.primarySaleHappened,
            isMutable: fields.isMutable,
            editionNonce: fields.editionNonce,
            tokenStandard: (fields.tokenStandard && fields.tokenStandard.toEncodable()) || null,
            collection: (fields.collection &&
                types.Collection.toEncodable(fields.collection)) ||
                null,
            uses: (fields.uses && types.Uses.toEncodable(fields.uses)) || null,
            tokenProgramVersion: fields.tokenProgramVersion.toEncodable(),
            creators: fields.creators.map((item) => types.Creator.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            name: this.name,
            symbol: this.symbol,
            uri: this.uri,
            sellerFeeBasisPoints: this.sellerFeeBasisPoints,
            primarySaleHappened: this.primarySaleHappened,
            isMutable: this.isMutable,
            editionNonce: this.editionNonce,
            tokenStandard: (this.tokenStandard && this.tokenStandard.toJSON()) || null,
            collection: (this.collection && this.collection.toJSON()) || null,
            uses: (this.uses && this.uses.toJSON()) || null,
            tokenProgramVersion: this.tokenProgramVersion.toJSON(),
            creators: this.creators.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new MetadataArgs({
            name: obj.name,
            symbol: obj.symbol,
            uri: obj.uri,
            sellerFeeBasisPoints: obj.sellerFeeBasisPoints,
            primarySaleHappened: obj.primarySaleHappened,
            isMutable: obj.isMutable,
            editionNonce: obj.editionNonce,
            tokenStandard: (obj.tokenStandard &&
                types.TokenStandard.fromJSON(obj.tokenStandard)) ||
                null,
            collection: (obj.collection && types.Collection.fromJSON(obj.collection)) || null,
            uses: (obj.uses && types.Uses.fromJSON(obj.uses)) || null,
            tokenProgramVersion: types.TokenProgramVersion.fromJSON(obj.tokenProgramVersion),
            creators: obj.creators.map((item) => types.Creator.fromJSON(item)),
        });
    }
    toEncodable() {
        return MetadataArgs.toEncodable(this);
    }
}
