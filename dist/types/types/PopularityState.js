import * as borsh from "@coral-xyz/borsh";
export class New {
    constructor() {
        this.discriminator = 0;
        this.kind = "New";
    }
    toJSON() {
        return {
            kind: "New",
        };
    }
    toEncodable() {
        return {
            New: {},
        };
    }
}
New.discriminator = 0;
New.kind = "New";
export class None {
    constructor() {
        this.discriminator = 1;
        this.kind = "None";
    }
    toJSON() {
        return {
            kind: "None",
        };
    }
    toEncodable() {
        return {
            None: {},
        };
    }
}
None.discriminator = 1;
None.kind = "None";
export class First {
    constructor() {
        this.discriminator = 2;
        this.kind = "First";
    }
    toJSON() {
        return {
            kind: "First",
        };
    }
    toEncodable() {
        return {
            First: {},
        };
    }
}
First.discriminator = 2;
First.kind = "First";
export class Ten {
    constructor() {
        this.discriminator = 3;
        this.kind = "Ten";
    }
    toJSON() {
        return {
            kind: "Ten",
        };
    }
    toEncodable() {
        return {
            Ten: {},
        };
    }
}
Ten.discriminator = 3;
Ten.kind = "Ten";
export class TwentyFive {
    constructor() {
        this.discriminator = 4;
        this.kind = "TwentyFive";
    }
    toJSON() {
        return {
            kind: "TwentyFive",
        };
    }
    toEncodable() {
        return {
            TwentyFive: {},
        };
    }
}
TwentyFive.discriminator = 4;
TwentyFive.kind = "TwentyFive";
export class Hundred {
    constructor() {
        this.discriminator = 5;
        this.kind = "Hundred";
    }
    toJSON() {
        return {
            kind: "Hundred",
        };
    }
    toEncodable() {
        return {
            Hundred: {},
        };
    }
}
Hundred.discriminator = 5;
Hundred.kind = "Hundred";
export class Thousand {
    constructor() {
        this.discriminator = 6;
        this.kind = "Thousand";
    }
    toJSON() {
        return {
            kind: "Thousand",
        };
    }
    toEncodable() {
        return {
            Thousand: {},
        };
    }
}
Thousand.discriminator = 6;
Thousand.kind = "Thousand";
export class TenThousand {
    constructor() {
        this.discriminator = 7;
        this.kind = "TenThousand";
    }
    toJSON() {
        return {
            kind: "TenThousand",
        };
    }
    toEncodable() {
        return {
            TenThousand: {},
        };
    }
}
TenThousand.discriminator = 7;
TenThousand.kind = "TenThousand";
export class HundredThousand {
    constructor() {
        this.discriminator = 8;
        this.kind = "HundredThousand";
    }
    toJSON() {
        return {
            kind: "HundredThousand",
        };
    }
    toEncodable() {
        return {
            HundredThousand: {},
        };
    }
}
HundredThousand.discriminator = 8;
HundredThousand.kind = "HundredThousand";
export class Million {
    constructor() {
        this.discriminator = 9;
        this.kind = "Million";
    }
    toJSON() {
        return {
            kind: "Million",
        };
    }
    toEncodable() {
        return {
            Million: {},
        };
    }
}
Million.discriminator = 9;
Million.kind = "Million";
export class TenMillion {
    constructor() {
        this.discriminator = 10;
        this.kind = "TenMillion";
    }
    toJSON() {
        return {
            kind: "TenMillion",
        };
    }
    toEncodable() {
        return {
            TenMillion: {},
        };
    }
}
TenMillion.discriminator = 10;
TenMillion.kind = "TenMillion";
export class HundredMillion {
    constructor() {
        this.discriminator = 11;
        this.kind = "HundredMillion";
    }
    toJSON() {
        return {
            kind: "HundredMillion",
        };
    }
    toEncodable() {
        return {
            HundredMillion: {},
        };
    }
}
HundredMillion.discriminator = 11;
HundredMillion.kind = "HundredMillion";
export class Billion {
    constructor() {
        this.discriminator = 12;
        this.kind = "Billion";
    }
    toJSON() {
        return {
            kind: "Billion",
        };
    }
    toEncodable() {
        return {
            Billion: {},
        };
    }
}
Billion.discriminator = 12;
Billion.kind = "Billion";
export class TenBillion {
    constructor() {
        this.discriminator = 13;
        this.kind = "TenBillion";
    }
    toJSON() {
        return {
            kind: "TenBillion",
        };
    }
    toEncodable() {
        return {
            TenBillion: {},
        };
    }
}
TenBillion.discriminator = 13;
TenBillion.kind = "TenBillion";
export class HundrerBillion {
    constructor() {
        this.discriminator = 14;
        this.kind = "HundrerBillion";
    }
    toJSON() {
        return {
            kind: "HundrerBillion",
        };
    }
    toEncodable() {
        return {
            HundrerBillion: {},
        };
    }
}
HundrerBillion.discriminator = 14;
HundrerBillion.kind = "HundrerBillion";
export class Trillion {
    constructor() {
        this.discriminator = 15;
        this.kind = "Trillion";
    }
    toJSON() {
        return {
            kind: "Trillion",
        };
    }
    toEncodable() {
        return {
            Trillion: {},
        };
    }
}
Trillion.discriminator = 15;
Trillion.kind = "Trillion";
export class TenTrillion {
    constructor() {
        this.discriminator = 16;
        this.kind = "TenTrillion";
    }
    toJSON() {
        return {
            kind: "TenTrillion",
        };
    }
    toEncodable() {
        return {
            TenTrillion: {},
        };
    }
}
TenTrillion.discriminator = 16;
TenTrillion.kind = "TenTrillion";
export class HundredTrillion {
    constructor() {
        this.discriminator = 17;
        this.kind = "HundredTrillion";
    }
    toJSON() {
        return {
            kind: "HundredTrillion",
        };
    }
    toEncodable() {
        return {
            HundredTrillion: {},
        };
    }
}
HundredTrillion.discriminator = 17;
HundredTrillion.kind = "HundredTrillion";
export class Highest {
    constructor() {
        this.discriminator = 18;
        this.kind = "Highest";
    }
    toJSON() {
        return {
            kind: "Highest",
        };
    }
    toEncodable() {
        return {
            Highest: {},
        };
    }
}
Highest.discriminator = 18;
Highest.kind = "Highest";
export class Banned {
    constructor() {
        this.discriminator = 19;
        this.kind = "Banned";
    }
    toJSON() {
        return {
            kind: "Banned",
        };
    }
    toEncodable() {
        return {
            Banned: {},
        };
    }
}
Banned.discriminator = 19;
Banned.kind = "Banned";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("New" in obj) {
        return new New();
    }
    if ("None" in obj) {
        return new None();
    }
    if ("First" in obj) {
        return new First();
    }
    if ("Ten" in obj) {
        return new Ten();
    }
    if ("TwentyFive" in obj) {
        return new TwentyFive();
    }
    if ("Hundred" in obj) {
        return new Hundred();
    }
    if ("Thousand" in obj) {
        return new Thousand();
    }
    if ("TenThousand" in obj) {
        return new TenThousand();
    }
    if ("HundredThousand" in obj) {
        return new HundredThousand();
    }
    if ("Million" in obj) {
        return new Million();
    }
    if ("TenMillion" in obj) {
        return new TenMillion();
    }
    if ("HundredMillion" in obj) {
        return new HundredMillion();
    }
    if ("Billion" in obj) {
        return new Billion();
    }
    if ("TenBillion" in obj) {
        return new TenBillion();
    }
    if ("HundrerBillion" in obj) {
        return new HundrerBillion();
    }
    if ("Trillion" in obj) {
        return new Trillion();
    }
    if ("TenTrillion" in obj) {
        return new TenTrillion();
    }
    if ("HundredTrillion" in obj) {
        return new HundredTrillion();
    }
    if ("Highest" in obj) {
        return new Highest();
    }
    if ("Banned" in obj) {
        return new Banned();
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "New": {
            return new New();
        }
        case "None": {
            return new None();
        }
        case "First": {
            return new First();
        }
        case "Ten": {
            return new Ten();
        }
        case "TwentyFive": {
            return new TwentyFive();
        }
        case "Hundred": {
            return new Hundred();
        }
        case "Thousand": {
            return new Thousand();
        }
        case "TenThousand": {
            return new TenThousand();
        }
        case "HundredThousand": {
            return new HundredThousand();
        }
        case "Million": {
            return new Million();
        }
        case "TenMillion": {
            return new TenMillion();
        }
        case "HundredMillion": {
            return new HundredMillion();
        }
        case "Billion": {
            return new Billion();
        }
        case "TenBillion": {
            return new TenBillion();
        }
        case "HundrerBillion": {
            return new HundrerBillion();
        }
        case "Trillion": {
            return new Trillion();
        }
        case "TenTrillion": {
            return new TenTrillion();
        }
        case "HundredTrillion": {
            return new HundredTrillion();
        }
        case "Highest": {
            return new Highest();
        }
        case "Banned": {
            return new Banned();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "New"),
        borsh.struct([], "None"),
        borsh.struct([], "First"),
        borsh.struct([], "Ten"),
        borsh.struct([], "TwentyFive"),
        borsh.struct([], "Hundred"),
        borsh.struct([], "Thousand"),
        borsh.struct([], "TenThousand"),
        borsh.struct([], "HundredThousand"),
        borsh.struct([], "Million"),
        borsh.struct([], "TenMillion"),
        borsh.struct([], "HundredMillion"),
        borsh.struct([], "Billion"),
        borsh.struct([], "TenBillion"),
        borsh.struct([], "HundrerBillion"),
        borsh.struct([], "Trillion"),
        borsh.struct([], "TenTrillion"),
        borsh.struct([], "HundredTrillion"),
        borsh.struct([], "Highest"),
        borsh.struct([], "Banned"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
