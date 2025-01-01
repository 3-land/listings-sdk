import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class ItemTrack {
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
            supply: new BN(obj.supply),
            created: new BN(obj.created),
        });
    }
    toEncodable() {
        return ItemTrack.toEncodable(this);
    }
}
