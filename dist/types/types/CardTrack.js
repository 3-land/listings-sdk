import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class CardTrack {
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
