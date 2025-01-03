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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTrack = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ItemTrack {
    constructor(fields) {
        this.state = fields.state;
        this.supply = fields.supply;
        this.created = fields.created;
    }
    static layout(property) {
        return borsh.struct([
            types.ItemState.layout("state"),
            borsh.u64("supply"),
            borsh.u64("created"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ItemTrack({
            state: types.ItemState.fromDecoded(obj.state),
            supply: obj.supply,
            created: obj.created,
        });
    }
    static toEncodable(fields) {
        return {
            state: fields.state.toEncodable(),
            supply: fields.supply,
            created: fields.created,
        };
    }
    toJSON() {
        return {
            state: this.state.toJSON(),
            supply: this.supply.toString(),
            created: this.created.toString(),
        };
    }
    static fromJSON(obj) {
        return new ItemTrack({
            state: types.ItemState.fromJSON(obj.state),
            supply: new bn_js_1.default(obj.supply),
            created: new bn_js_1.default(obj.created),
        });
    }
    toEncodable() {
        return ItemTrack.toEncodable(this);
    }
}
exports.ItemTrack = ItemTrack;
//# sourceMappingURL=ItemTrack.js.map