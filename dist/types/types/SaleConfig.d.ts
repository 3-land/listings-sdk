import * as types from "../types";
export interface SaleConfigFields {
    prices: Array<types.PriceFields>;
    priceType: types.PriceRuleKind;
    rules: Array<types.RuleKind>;
    sendToVault: number;
    saleType: types.SaleTypeKind;
}
export interface SaleConfigJSON {
    prices: Array<types.PriceJSON>;
    priceType: types.PriceRuleJSON;
    rules: Array<types.RuleJSON>;
    sendToVault: number;
    saleType: types.SaleTypeJSON;
}
export declare class SaleConfig {
    readonly prices: Array<types.Price>;
    readonly priceType: types.PriceRuleKind;
    readonly rules: Array<types.RuleKind>;
    readonly sendToVault: number;
    readonly saleType: types.SaleTypeKind;
    constructor(fields: SaleConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): SaleConfig;
    static toEncodable(fields: SaleConfigFields): {
        prices: any[];
        priceType: any;
        rules: any[];
        sendToVault: number;
        saleType: any;
    };
    toJSON(): SaleConfigJSON;
    static fromJSON(obj: SaleConfigJSON): SaleConfig;
    toEncodable(): {
        prices: any[];
        priceType: any;
        rules: any[];
        sendToVault: number;
        saleType: any;
    };
}
