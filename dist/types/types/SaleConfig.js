"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleConfig = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SaleConfig {
    constructor(fields) {
        this.prices = fields.prices.map((item) => new types.Price({ ...item }));
        this.priceType = fields.priceType;
        this.rules = fields.rules;
        this.sendToVault = fields.sendToVault;
        this.saleType = fields.saleType;
    }
    static layout(property) {
        return borsh.struct([
            borsh.vec(types.Price.layout(), "prices"),
            types.PriceRule.layout("priceType"),
            borsh.vec(types.Rule.layout(), "rules"),
            borsh.u8("sendToVault"),
            types.SaleType.layout("saleType"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SaleConfig({
            prices: obj.prices.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Price.fromDecoded(item)),
            priceType: types.PriceRule.fromDecoded(obj.priceType),
            rules: obj.rules.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.Rule.fromDecoded(item)),
            sendToVault: obj.sendToVault,
            saleType: types.SaleType.fromDecoded(obj.saleType),
        });
    }
    static toEncodable(fields) {
        return {
            prices: fields.prices.map((item) => types.Price.toEncodable(item)),
            priceType: fields.priceType.toEncodable(),
            rules: fields.rules.map((item) => item.toEncodable()),
            sendToVault: fields.sendToVault,
            saleType: fields.saleType.toEncodable(),
        };
    }
    toJSON() {
        return {
            prices: this.prices.map((item) => item.toJSON()),
            priceType: this.priceType.toJSON(),
            rules: this.rules.map((item) => item.toJSON()),
            sendToVault: this.sendToVault,
            saleType: this.saleType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new SaleConfig({
            prices: obj.prices.map((item) => types.Price.fromJSON(item)),
            priceType: types.PriceRule.fromJSON(obj.priceType),
            rules: obj.rules.map((item) => types.Rule.fromJSON(item)),
            sendToVault: obj.sendToVault,
            saleType: types.SaleType.fromJSON(obj.saleType),
        });
    }
    toEncodable() {
        return SaleConfig.toEncodable(this);
    }
}
exports.SaleConfig = SaleConfig;
//# sourceMappingURL=SaleConfig.js.map