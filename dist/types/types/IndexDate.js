import * as borsh from "@coral-xyz/borsh";
export class IndexDate {
    constructor(fields) {
        this.hour = fields.hour;
        this.day = fields.day;
        this.week = fields.week;
        this.month = fields.month;
        this.minRelative = fields.minRelative;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("hour"),
            borsh.u32("day"),
            borsh.u32("week"),
            borsh.u32("month"),
            borsh.u8("minRelative"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IndexDate({
            hour: obj.hour,
            day: obj.day,
            week: obj.week,
            month: obj.month,
            minRelative: obj.minRelative,
        });
    }
    static toEncodable(fields) {
        return {
            hour: fields.hour,
            day: fields.day,
            week: fields.week,
            month: fields.month,
            minRelative: fields.minRelative,
        };
    }
    toJSON() {
        return {
            hour: this.hour,
            day: this.day,
            week: this.week,
            month: this.month,
            minRelative: this.minRelative,
        };
    }
    static fromJSON(obj) {
        return new IndexDate({
            hour: obj.hour,
            day: obj.day,
            week: obj.week,
            month: obj.month,
            minRelative: obj.minRelative,
        });
    }
    toEncodable() {
        return IndexDate.toEncodable(this);
    }
}
