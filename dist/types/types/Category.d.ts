export interface CategoryFields {
    cat1: number;
    cat2: number;
    cat3: number;
}
export interface CategoryJSON {
    cat1: number;
    cat2: number;
    cat3: number;
}
export declare class Category {
    readonly cat1: number;
    readonly cat2: number;
    readonly cat3: number;
    constructor(fields: CategoryFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): Category;
    static toEncodable(fields: CategoryFields): {
        cat1: number;
        cat2: number;
        cat3: number;
    };
    toJSON(): CategoryJSON;
    static fromJSON(obj: CategoryJSON): Category;
    toEncodable(): {
        cat1: number;
        cat2: number;
        cat3: number;
    };
}
