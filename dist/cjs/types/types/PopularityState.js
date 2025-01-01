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
exports.Banned = exports.Highest = exports.HundredTrillion = exports.TenTrillion = exports.Trillion = exports.HundrerBillion = exports.TenBillion = exports.Billion = exports.HundredMillion = exports.TenMillion = exports.Million = exports.HundredThousand = exports.TenThousand = exports.Thousand = exports.Hundred = exports.TwentyFive = exports.Ten = exports.First = exports.None = exports.New = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class New {
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
exports.New = New;
New.discriminator = 0;
New.kind = "New";
class None {
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
exports.None = None;
None.discriminator = 1;
None.kind = "None";
class First {
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
exports.First = First;
First.discriminator = 2;
First.kind = "First";
class Ten {
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
exports.Ten = Ten;
Ten.discriminator = 3;
Ten.kind = "Ten";
class TwentyFive {
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
exports.TwentyFive = TwentyFive;
TwentyFive.discriminator = 4;
TwentyFive.kind = "TwentyFive";
class Hundred {
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
exports.Hundred = Hundred;
Hundred.discriminator = 5;
Hundred.kind = "Hundred";
class Thousand {
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
exports.Thousand = Thousand;
Thousand.discriminator = 6;
Thousand.kind = "Thousand";
class TenThousand {
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
exports.TenThousand = TenThousand;
TenThousand.discriminator = 7;
TenThousand.kind = "TenThousand";
class HundredThousand {
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
exports.HundredThousand = HundredThousand;
HundredThousand.discriminator = 8;
HundredThousand.kind = "HundredThousand";
class Million {
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
exports.Million = Million;
Million.discriminator = 9;
Million.kind = "Million";
class TenMillion {
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
exports.TenMillion = TenMillion;
TenMillion.discriminator = 10;
TenMillion.kind = "TenMillion";
class HundredMillion {
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
exports.HundredMillion = HundredMillion;
HundredMillion.discriminator = 11;
HundredMillion.kind = "HundredMillion";
class Billion {
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
exports.Billion = Billion;
Billion.discriminator = 12;
Billion.kind = "Billion";
class TenBillion {
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
exports.TenBillion = TenBillion;
TenBillion.discriminator = 13;
TenBillion.kind = "TenBillion";
class HundrerBillion {
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
exports.HundrerBillion = HundrerBillion;
HundrerBillion.discriminator = 14;
HundrerBillion.kind = "HundrerBillion";
class Trillion {
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
exports.Trillion = Trillion;
Trillion.discriminator = 15;
Trillion.kind = "Trillion";
class TenTrillion {
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
exports.TenTrillion = TenTrillion;
TenTrillion.discriminator = 16;
TenTrillion.kind = "TenTrillion";
class HundredTrillion {
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
exports.HundredTrillion = HundredTrillion;
HundredTrillion.discriminator = 17;
HundredTrillion.kind = "HundredTrillion";
class Highest {
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
exports.Highest = Highest;
Highest.discriminator = 18;
Highest.kind = "Highest";
class Banned {
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
exports.Banned = Banned;
Banned.discriminator = 19;
Banned.kind = "Banned";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
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
function fromJSON(obj) {
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
function layout(property) {
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
//# sourceMappingURL=PopularityState.js.map