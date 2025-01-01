import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Creator {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "Creator";
        this.value = {
            creators: value.creators.map((item) => new types.Creator(Object.assign({}, item))),
        };
    }
    toJSON() {
        return {
            kind: "Creator",
            value: {
                creators: this.value.creators.map((item) => item.toJSON()),
            },
        };
    }
    toEncodable() {
        return {
            Creator: {
                creators: this.value.creators.map((item) => types.Creator.toEncodable(item)),
            },
        };
    }
}
Creator.discriminator = 0;
Creator.kind = "Creator";
export class PdaCreator {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "PdaCreator";
        this.value = {
            creators: value.creators.map((item) => new types.Creator(Object.assign({}, item))),
            hasher: new types.AccountHasher(Object.assign({}, value.hasher)),
        };
    }
    toJSON() {
        return {
            kind: "PdaCreator",
            value: {
                creators: this.value.creators.map((item) => item.toJSON()),
                hasher: this.value.hasher.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            PdaCreator: {
                creators: this.value.creators.map((item) => types.Creator.toEncodable(item)),
                hasher: types.AccountHasher.toEncodable(this.value.hasher),
            },
        };
    }
}
PdaCreator.discriminator = 1;
PdaCreator.kind = "PdaCreator";
export class Collection {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "Collection";
        this.value = {
            metadata: new types.VerifyCollectionMetadata(Object.assign({}, value.metadata)),
            subtype: value.subtype,
        };
    }
    toJSON() {
        return {
            kind: "Collection",
            value: {
                metadata: this.value.metadata.toJSON(),
                subtype: this.value.subtype.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            Collection: {
                metadata: types.VerifyCollectionMetadata.toEncodable(this.value.metadata),
                subtype: this.value.subtype.toEncodable(),
            },
        };
    }
}
Collection.discriminator = 2;
Collection.kind = "Collection";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Creator" in obj) {
        const val = obj["Creator"];
        return new Creator({
            creators: val["creators"].map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
        });
    }
    if ("PdaCreator" in obj) {
        const val = obj["PdaCreator"];
        return new PdaCreator({
            creators: val["creators"].map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Creator.fromDecoded(item)),
            hasher: types.AccountHasher.fromDecoded(val["hasher"]),
        });
    }
    if ("Collection" in obj) {
        const val = obj["Collection"];
        return new Collection({
            metadata: types.VerifyCollectionMetadata.fromDecoded(val["metadata"]),
            subtype: types.DepositSubtype.fromDecoded(val["subtype"]),
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "Creator": {
            return new Creator({
                creators: obj.value.creators.map((item) => types.Creator.fromJSON(item)),
            });
        }
        case "PdaCreator": {
            return new PdaCreator({
                creators: obj.value.creators.map((item) => types.Creator.fromJSON(item)),
                hasher: types.AccountHasher.fromJSON(obj.value.hasher),
            });
        }
        case "Collection": {
            return new Collection({
                metadata: types.VerifyCollectionMetadata.fromJSON(obj.value.metadata),
                subtype: types.DepositSubtype.fromJSON(obj.value.subtype),
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.vec(types.Creator.layout(), "creators")], "Creator"),
        borsh.struct([
            borsh.vec(types.Creator.layout(), "creators"),
            types.AccountHasher.layout("hasher"),
        ], "PdaCreator"),
        borsh.struct([
            types.VerifyCollectionMetadata.layout("metadata"),
            types.DepositSubtype.layout("subtype"),
        ], "Collection"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
