import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SemiFungible {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "SemiFungible";
        this.value = {
            typeId: value.typeId,
            amount: value.amount,
        };
    }
    toJSON() {
        return {
            kind: "SemiFungible",
            value: {
                typeId: this.value.typeId,
                amount: this.value.amount.toString(),
            },
        };
    }
    toEncodable() {
        return {
            SemiFungible: {
                typeId: this.value.typeId,
                amount: this.value.amount,
            },
        };
    }
}
SemiFungible.discriminator = 0;
SemiFungible.kind = "SemiFungible";
export class Date {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "Date";
        this.value = {
            typeId: value.typeId,
            date: value.date,
        };
    }
    toJSON() {
        return {
            kind: "Date",
            value: {
                typeId: this.value.typeId,
                date: this.value.date,
            },
        };
    }
    toEncodable() {
        return {
            Date: {
                typeId: this.value.typeId,
                date: this.value.date,
            },
        };
    }
}
Date.discriminator = 1;
Date.kind = "Date";
export class NonFungible {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "NonFungible";
        this.value = {
            typeId: value.typeId,
            valueId: value.valueId,
        };
    }
    toJSON() {
        return {
            kind: "NonFungible",
            value: {
                typeId: this.value.typeId,
                valueId: this.value.valueId,
            },
        };
    }
    toEncodable() {
        return {
            NonFungible: {
                typeId: this.value.typeId,
                valueId: this.value.valueId,
            },
        };
    }
}
NonFungible.discriminator = 2;
NonFungible.kind = "NonFungible";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("SemiFungible" in obj) {
        const val = obj["SemiFungible"];
        return new SemiFungible({
            typeId: val["typeId"],
            amount: val["amount"],
        });
    }
    if ("Date" in obj) {
        const val = obj["Date"];
        return new Date({
            typeId: val["typeId"],
            date: val["date"],
        });
    }
    if ("NonFungible" in obj) {
        const val = obj["NonFungible"];
        return new NonFungible({
            typeId: val["typeId"],
            valueId: val["valueId"],
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "SemiFungible": {
            return new SemiFungible({
                typeId: obj.value.typeId,
                amount: new BN(obj.value.amount),
            });
        }
        case "Date": {
            return new Date({
                typeId: obj.value.typeId,
                date: obj.value.date,
            });
        }
        case "NonFungible": {
            return new NonFungible({
                typeId: obj.value.typeId,
                valueId: obj.value.valueId,
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.u16("typeId"), borsh.u64("amount")], "SemiFungible"),
        borsh.struct([borsh.u16("typeId"), borsh.u32("date")], "Date"),
        borsh.struct([borsh.u16("typeId"), borsh.u16("valueId")], "NonFungible"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
