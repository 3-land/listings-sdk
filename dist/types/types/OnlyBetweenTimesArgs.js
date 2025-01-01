import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class OnlyBetweenTimesArgs {
    constructor(fields) {
        this.start = fields.start;
        this.end = fields.end;
        this.rangeType = fields.rangeType;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("start"),
            borsh.u32("end"),
            types.TimeRangeType.layout("rangeType"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OnlyBetweenTimesArgs({
            start: obj.start,
            end: obj.end,
            rangeType: types.TimeRangeType.fromDecoded(obj.rangeType),
        });
    }
    static toEncodable(fields) {
        return {
            start: fields.start,
            end: fields.end,
            rangeType: fields.rangeType.toEncodable(),
        };
    }
    toJSON() {
        return {
            start: this.start,
            end: this.end,
            rangeType: this.rangeType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new OnlyBetweenTimesArgs({
            start: obj.start,
            end: obj.end,
            rangeType: types.TimeRangeType.fromJSON(obj.rangeType),
        });
    }
    toEncodable() {
        return OnlyBetweenTimesArgs.toEncodable(this);
    }
}
