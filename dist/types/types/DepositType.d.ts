import * as types from "../types";
export type CreatorFields = {
    creators: Array<types.CreatorFields>;
};
export type CreatorValue = {
    creators: Array<types.Creator>;
};
export interface CreatorJSON {
    kind: "Creator";
    value: {
        creators: Array<types.CreatorJSON>;
    };
}
export declare class Creator {
    static readonly discriminator = 0;
    static readonly kind = "Creator";
    readonly discriminator = 0;
    readonly kind = "Creator";
    readonly value: CreatorValue;
    constructor(value: CreatorFields);
    toJSON(): CreatorJSON;
    toEncodable(): {
        Creator: {
            creators: any[];
        };
    };
}
export type PdaCreatorFields = {
    creators: Array<types.CreatorFields>;
    hasher: types.AccountHasherFields;
};
export type PdaCreatorValue = {
    creators: Array<types.Creator>;
    hasher: types.AccountHasher;
};
export interface PdaCreatorJSON {
    kind: "PdaCreator";
    value: {
        creators: Array<types.CreatorJSON>;
        hasher: types.AccountHasherJSON;
    };
}
export declare class PdaCreator {
    static readonly discriminator = 1;
    static readonly kind = "PdaCreator";
    readonly discriminator = 1;
    readonly kind = "PdaCreator";
    readonly value: PdaCreatorValue;
    constructor(value: PdaCreatorFields);
    toJSON(): PdaCreatorJSON;
    toEncodable(): {
        PdaCreator: {
            creators: any[];
            hasher: any;
        };
    };
}
export type CollectionFields = {
    metadata: types.VerifyCollectionMetadataFields;
    subtype: types.DepositSubtypeKind;
};
export type CollectionValue = {
    metadata: types.VerifyCollectionMetadata;
    subtype: types.DepositSubtypeKind;
};
export interface CollectionJSON {
    kind: "Collection";
    value: {
        metadata: types.VerifyCollectionMetadataJSON;
        subtype: types.DepositSubtypeJSON;
    };
}
export declare class Collection {
    static readonly discriminator = 2;
    static readonly kind = "Collection";
    readonly discriminator = 2;
    readonly kind = "Collection";
    readonly value: CollectionValue;
    constructor(value: CollectionFields);
    toJSON(): CollectionJSON;
    toEncodable(): {
        Collection: {
            metadata: any;
            subtype: any;
        };
    };
}
export declare function fromDecoded(obj: any): types.DepositTypeKind;
export declare function fromJSON(obj: types.DepositTypeJSON): types.DepositTypeKind;
export declare function layout(property?: string): any;
