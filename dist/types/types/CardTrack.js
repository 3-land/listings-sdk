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
exports.CardTrack = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CardTrack {
    constructor(fields) {
        this.supply = fields.supply;
        this.created = fields.created;
        this.state = fields.state;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("supply"),
            borsh.u32("created"),
            types.CardState.layout("state"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CardTrack({
            supply: obj.supply,
            created: obj.created,
            state: types.CardState.fromDecoded(obj.state),
        });
    }
    static toEncodable(fields) {
        return {
            supply: fields.supply,
            created: fields.created,
            state: fields.state.toEncodable(),
        };
    }
    toJSON() {
        return {
            supply: this.supply,
            created: this.created,
            state: this.state.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new CardTrack({
            supply: obj.supply,
            created: obj.created,
            state: types.CardState.fromJSON(obj.state),
        });
    }
    toEncodable() {
        return CardTrack.toEncodable(this);
    }
}
exports.CardTrack = CardTrack;
//# sourceMappingURL=CardTrack.js.map