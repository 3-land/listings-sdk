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
exports.PoolVaultV1 = exports.DonationRegistryV1 = exports.ThreeIdV1 = exports.RevealerForMeV1 = exports.SecureHolderV1 = exports.ArtistBurnTrackV1 = exports.GlobalBurnTrackV1 = exports.BurnDepositV1 = exports.ZeroOpenHolderV1 = exports.PackUploadsV1 = exports.PackTraitsV1 = exports.CollectorArtistRegistryV1 = exports.CollectorGlobalRegistryV1 = exports.CreatorRegistryV1 = exports.None = exports.PackArchiveV1 = exports.SingleArchiveV1 = exports.BuyTrackV1 = exports.PackOpenHolderV1 = exports.PackContentV1 = exports.PackReceiptV1 = exports.CardV1 = exports.PackV1 = exports.SingleV1 = exports.StoreV1 = exports.HolderV1 = void 0;
exports.fromDecoded = fromDecoded;
exports.fromJSON = fromJSON;
exports.layout = layout;
const borsh = __importStar(require("@coral-xyz/borsh"));
class HolderV1 {
    constructor() {
        this.discriminator = 0;
        this.kind = "HolderV1";
    }
    toJSON() {
        return {
            kind: "HolderV1",
        };
    }
    toEncodable() {
        return {
            HolderV1: {},
        };
    }
}
exports.HolderV1 = HolderV1;
HolderV1.discriminator = 0;
HolderV1.kind = "HolderV1";
class StoreV1 {
    constructor() {
        this.discriminator = 1;
        this.kind = "StoreV1";
    }
    toJSON() {
        return {
            kind: "StoreV1",
        };
    }
    toEncodable() {
        return {
            StoreV1: {},
        };
    }
}
exports.StoreV1 = StoreV1;
StoreV1.discriminator = 1;
StoreV1.kind = "StoreV1";
class SingleV1 {
    constructor() {
        this.discriminator = 2;
        this.kind = "SingleV1";
    }
    toJSON() {
        return {
            kind: "SingleV1",
        };
    }
    toEncodable() {
        return {
            SingleV1: {},
        };
    }
}
exports.SingleV1 = SingleV1;
SingleV1.discriminator = 2;
SingleV1.kind = "SingleV1";
class PackV1 {
    constructor() {
        this.discriminator = 3;
        this.kind = "PackV1";
    }
    toJSON() {
        return {
            kind: "PackV1",
        };
    }
    toEncodable() {
        return {
            PackV1: {},
        };
    }
}
exports.PackV1 = PackV1;
PackV1.discriminator = 3;
PackV1.kind = "PackV1";
class CardV1 {
    constructor() {
        this.discriminator = 4;
        this.kind = "CardV1";
    }
    toJSON() {
        return {
            kind: "CardV1",
        };
    }
    toEncodable() {
        return {
            CardV1: {},
        };
    }
}
exports.CardV1 = CardV1;
CardV1.discriminator = 4;
CardV1.kind = "CardV1";
class PackReceiptV1 {
    constructor() {
        this.discriminator = 5;
        this.kind = "PackReceiptV1";
    }
    toJSON() {
        return {
            kind: "PackReceiptV1",
        };
    }
    toEncodable() {
        return {
            PackReceiptV1: {},
        };
    }
}
exports.PackReceiptV1 = PackReceiptV1;
PackReceiptV1.discriminator = 5;
PackReceiptV1.kind = "PackReceiptV1";
class PackContentV1 {
    constructor() {
        this.discriminator = 6;
        this.kind = "PackContentV1";
    }
    toJSON() {
        return {
            kind: "PackContentV1",
        };
    }
    toEncodable() {
        return {
            PackContentV1: {},
        };
    }
}
exports.PackContentV1 = PackContentV1;
PackContentV1.discriminator = 6;
PackContentV1.kind = "PackContentV1";
class PackOpenHolderV1 {
    constructor() {
        this.discriminator = 7;
        this.kind = "PackOpenHolderV1";
    }
    toJSON() {
        return {
            kind: "PackOpenHolderV1",
        };
    }
    toEncodable() {
        return {
            PackOpenHolderV1: {},
        };
    }
}
exports.PackOpenHolderV1 = PackOpenHolderV1;
PackOpenHolderV1.discriminator = 7;
PackOpenHolderV1.kind = "PackOpenHolderV1";
class BuyTrackV1 {
    constructor() {
        this.discriminator = 8;
        this.kind = "BuyTrackV1";
    }
    toJSON() {
        return {
            kind: "BuyTrackV1",
        };
    }
    toEncodable() {
        return {
            BuyTrackV1: {},
        };
    }
}
exports.BuyTrackV1 = BuyTrackV1;
BuyTrackV1.discriminator = 8;
BuyTrackV1.kind = "BuyTrackV1";
class SingleArchiveV1 {
    constructor() {
        this.discriminator = 9;
        this.kind = "SingleArchiveV1";
    }
    toJSON() {
        return {
            kind: "SingleArchiveV1",
        };
    }
    toEncodable() {
        return {
            SingleArchiveV1: {},
        };
    }
}
exports.SingleArchiveV1 = SingleArchiveV1;
SingleArchiveV1.discriminator = 9;
SingleArchiveV1.kind = "SingleArchiveV1";
class PackArchiveV1 {
    constructor() {
        this.discriminator = 10;
        this.kind = "PackArchiveV1";
    }
    toJSON() {
        return {
            kind: "PackArchiveV1",
        };
    }
    toEncodable() {
        return {
            PackArchiveV1: {},
        };
    }
}
exports.PackArchiveV1 = PackArchiveV1;
PackArchiveV1.discriminator = 10;
PackArchiveV1.kind = "PackArchiveV1";
class None {
    constructor() {
        this.discriminator = 11;
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
None.discriminator = 11;
None.kind = "None";
class CreatorRegistryV1 {
    constructor() {
        this.discriminator = 12;
        this.kind = "CreatorRegistryV1";
    }
    toJSON() {
        return {
            kind: "CreatorRegistryV1",
        };
    }
    toEncodable() {
        return {
            CreatorRegistryV1: {},
        };
    }
}
exports.CreatorRegistryV1 = CreatorRegistryV1;
CreatorRegistryV1.discriminator = 12;
CreatorRegistryV1.kind = "CreatorRegistryV1";
class CollectorGlobalRegistryV1 {
    constructor() {
        this.discriminator = 13;
        this.kind = "CollectorGlobalRegistryV1";
    }
    toJSON() {
        return {
            kind: "CollectorGlobalRegistryV1",
        };
    }
    toEncodable() {
        return {
            CollectorGlobalRegistryV1: {},
        };
    }
}
exports.CollectorGlobalRegistryV1 = CollectorGlobalRegistryV1;
CollectorGlobalRegistryV1.discriminator = 13;
CollectorGlobalRegistryV1.kind = "CollectorGlobalRegistryV1";
class CollectorArtistRegistryV1 {
    constructor() {
        this.discriminator = 14;
        this.kind = "CollectorArtistRegistryV1";
    }
    toJSON() {
        return {
            kind: "CollectorArtistRegistryV1",
        };
    }
    toEncodable() {
        return {
            CollectorArtistRegistryV1: {},
        };
    }
}
exports.CollectorArtistRegistryV1 = CollectorArtistRegistryV1;
CollectorArtistRegistryV1.discriminator = 14;
CollectorArtistRegistryV1.kind = "CollectorArtistRegistryV1";
class PackTraitsV1 {
    constructor() {
        this.discriminator = 15;
        this.kind = "PackTraitsV1";
    }
    toJSON() {
        return {
            kind: "PackTraitsV1",
        };
    }
    toEncodable() {
        return {
            PackTraitsV1: {},
        };
    }
}
exports.PackTraitsV1 = PackTraitsV1;
PackTraitsV1.discriminator = 15;
PackTraitsV1.kind = "PackTraitsV1";
class PackUploadsV1 {
    constructor() {
        this.discriminator = 16;
        this.kind = "PackUploadsV1";
    }
    toJSON() {
        return {
            kind: "PackUploadsV1",
        };
    }
    toEncodable() {
        return {
            PackUploadsV1: {},
        };
    }
}
exports.PackUploadsV1 = PackUploadsV1;
PackUploadsV1.discriminator = 16;
PackUploadsV1.kind = "PackUploadsV1";
class ZeroOpenHolderV1 {
    constructor() {
        this.discriminator = 17;
        this.kind = "ZeroOpenHolderV1";
    }
    toJSON() {
        return {
            kind: "ZeroOpenHolderV1",
        };
    }
    toEncodable() {
        return {
            ZeroOpenHolderV1: {},
        };
    }
}
exports.ZeroOpenHolderV1 = ZeroOpenHolderV1;
ZeroOpenHolderV1.discriminator = 17;
ZeroOpenHolderV1.kind = "ZeroOpenHolderV1";
class BurnDepositV1 {
    constructor() {
        this.discriminator = 18;
        this.kind = "BurnDepositV1";
    }
    toJSON() {
        return {
            kind: "BurnDepositV1",
        };
    }
    toEncodable() {
        return {
            BurnDepositV1: {},
        };
    }
}
exports.BurnDepositV1 = BurnDepositV1;
BurnDepositV1.discriminator = 18;
BurnDepositV1.kind = "BurnDepositV1";
class GlobalBurnTrackV1 {
    constructor() {
        this.discriminator = 19;
        this.kind = "GlobalBurnTrackV1";
    }
    toJSON() {
        return {
            kind: "GlobalBurnTrackV1",
        };
    }
    toEncodable() {
        return {
            GlobalBurnTrackV1: {},
        };
    }
}
exports.GlobalBurnTrackV1 = GlobalBurnTrackV1;
GlobalBurnTrackV1.discriminator = 19;
GlobalBurnTrackV1.kind = "GlobalBurnTrackV1";
class ArtistBurnTrackV1 {
    constructor() {
        this.discriminator = 20;
        this.kind = "ArtistBurnTrackV1";
    }
    toJSON() {
        return {
            kind: "ArtistBurnTrackV1",
        };
    }
    toEncodable() {
        return {
            ArtistBurnTrackV1: {},
        };
    }
}
exports.ArtistBurnTrackV1 = ArtistBurnTrackV1;
ArtistBurnTrackV1.discriminator = 20;
ArtistBurnTrackV1.kind = "ArtistBurnTrackV1";
class SecureHolderV1 {
    constructor() {
        this.discriminator = 21;
        this.kind = "SecureHolderV1";
    }
    toJSON() {
        return {
            kind: "SecureHolderV1",
        };
    }
    toEncodable() {
        return {
            SecureHolderV1: {},
        };
    }
}
exports.SecureHolderV1 = SecureHolderV1;
SecureHolderV1.discriminator = 21;
SecureHolderV1.kind = "SecureHolderV1";
class RevealerForMeV1 {
    constructor() {
        this.discriminator = 22;
        this.kind = "RevealerForMeV1";
    }
    toJSON() {
        return {
            kind: "RevealerForMeV1",
        };
    }
    toEncodable() {
        return {
            RevealerForMeV1: {},
        };
    }
}
exports.RevealerForMeV1 = RevealerForMeV1;
RevealerForMeV1.discriminator = 22;
RevealerForMeV1.kind = "RevealerForMeV1";
class ThreeIdV1 {
    constructor() {
        this.discriminator = 23;
        this.kind = "ThreeIdV1";
    }
    toJSON() {
        return {
            kind: "ThreeIdV1",
        };
    }
    toEncodable() {
        return {
            ThreeIdV1: {},
        };
    }
}
exports.ThreeIdV1 = ThreeIdV1;
ThreeIdV1.discriminator = 23;
ThreeIdV1.kind = "ThreeIdV1";
class DonationRegistryV1 {
    constructor() {
        this.discriminator = 24;
        this.kind = "DonationRegistryV1";
    }
    toJSON() {
        return {
            kind: "DonationRegistryV1",
        };
    }
    toEncodable() {
        return {
            DonationRegistryV1: {},
        };
    }
}
exports.DonationRegistryV1 = DonationRegistryV1;
DonationRegistryV1.discriminator = 24;
DonationRegistryV1.kind = "DonationRegistryV1";
class PoolVaultV1 {
    constructor() {
        this.discriminator = 25;
        this.kind = "PoolVaultV1";
    }
    toJSON() {
        return {
            kind: "PoolVaultV1",
        };
    }
    toEncodable() {
        return {
            PoolVaultV1: {},
        };
    }
}
exports.PoolVaultV1 = PoolVaultV1;
PoolVaultV1.discriminator = 25;
PoolVaultV1.kind = "PoolVaultV1";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("HolderV1" in obj) {
        return new HolderV1();
    }
    if ("StoreV1" in obj) {
        return new StoreV1();
    }
    if ("SingleV1" in obj) {
        return new SingleV1();
    }
    if ("PackV1" in obj) {
        return new PackV1();
    }
    if ("CardV1" in obj) {
        return new CardV1();
    }
    if ("PackReceiptV1" in obj) {
        return new PackReceiptV1();
    }
    if ("PackContentV1" in obj) {
        return new PackContentV1();
    }
    if ("PackOpenHolderV1" in obj) {
        return new PackOpenHolderV1();
    }
    if ("BuyTrackV1" in obj) {
        return new BuyTrackV1();
    }
    if ("SingleArchiveV1" in obj) {
        return new SingleArchiveV1();
    }
    if ("PackArchiveV1" in obj) {
        return new PackArchiveV1();
    }
    if ("None" in obj) {
        return new None();
    }
    if ("CreatorRegistryV1" in obj) {
        return new CreatorRegistryV1();
    }
    if ("CollectorGlobalRegistryV1" in obj) {
        return new CollectorGlobalRegistryV1();
    }
    if ("CollectorArtistRegistryV1" in obj) {
        return new CollectorArtistRegistryV1();
    }
    if ("PackTraitsV1" in obj) {
        return new PackTraitsV1();
    }
    if ("PackUploadsV1" in obj) {
        return new PackUploadsV1();
    }
    if ("ZeroOpenHolderV1" in obj) {
        return new ZeroOpenHolderV1();
    }
    if ("BurnDepositV1" in obj) {
        return new BurnDepositV1();
    }
    if ("GlobalBurnTrackV1" in obj) {
        return new GlobalBurnTrackV1();
    }
    if ("ArtistBurnTrackV1" in obj) {
        return new ArtistBurnTrackV1();
    }
    if ("SecureHolderV1" in obj) {
        return new SecureHolderV1();
    }
    if ("RevealerForMeV1" in obj) {
        return new RevealerForMeV1();
    }
    if ("ThreeIdV1" in obj) {
        return new ThreeIdV1();
    }
    if ("DonationRegistryV1" in obj) {
        return new DonationRegistryV1();
    }
    if ("PoolVaultV1" in obj) {
        return new PoolVaultV1();
    }
    throw new Error("Invalid enum object");
}
function fromJSON(obj) {
    switch (obj.kind) {
        case "HolderV1": {
            return new HolderV1();
        }
        case "StoreV1": {
            return new StoreV1();
        }
        case "SingleV1": {
            return new SingleV1();
        }
        case "PackV1": {
            return new PackV1();
        }
        case "CardV1": {
            return new CardV1();
        }
        case "PackReceiptV1": {
            return new PackReceiptV1();
        }
        case "PackContentV1": {
            return new PackContentV1();
        }
        case "PackOpenHolderV1": {
            return new PackOpenHolderV1();
        }
        case "BuyTrackV1": {
            return new BuyTrackV1();
        }
        case "SingleArchiveV1": {
            return new SingleArchiveV1();
        }
        case "PackArchiveV1": {
            return new PackArchiveV1();
        }
        case "None": {
            return new None();
        }
        case "CreatorRegistryV1": {
            return new CreatorRegistryV1();
        }
        case "CollectorGlobalRegistryV1": {
            return new CollectorGlobalRegistryV1();
        }
        case "CollectorArtistRegistryV1": {
            return new CollectorArtistRegistryV1();
        }
        case "PackTraitsV1": {
            return new PackTraitsV1();
        }
        case "PackUploadsV1": {
            return new PackUploadsV1();
        }
        case "ZeroOpenHolderV1": {
            return new ZeroOpenHolderV1();
        }
        case "BurnDepositV1": {
            return new BurnDepositV1();
        }
        case "GlobalBurnTrackV1": {
            return new GlobalBurnTrackV1();
        }
        case "ArtistBurnTrackV1": {
            return new ArtistBurnTrackV1();
        }
        case "SecureHolderV1": {
            return new SecureHolderV1();
        }
        case "RevealerForMeV1": {
            return new RevealerForMeV1();
        }
        case "ThreeIdV1": {
            return new ThreeIdV1();
        }
        case "DonationRegistryV1": {
            return new DonationRegistryV1();
        }
        case "PoolVaultV1": {
            return new PoolVaultV1();
        }
    }
}
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "HolderV1"),
        borsh.struct([], "StoreV1"),
        borsh.struct([], "SingleV1"),
        borsh.struct([], "PackV1"),
        borsh.struct([], "CardV1"),
        borsh.struct([], "PackReceiptV1"),
        borsh.struct([], "PackContentV1"),
        borsh.struct([], "PackOpenHolderV1"),
        borsh.struct([], "BuyTrackV1"),
        borsh.struct([], "SingleArchiveV1"),
        borsh.struct([], "PackArchiveV1"),
        borsh.struct([], "None"),
        borsh.struct([], "CreatorRegistryV1"),
        borsh.struct([], "CollectorGlobalRegistryV1"),
        borsh.struct([], "CollectorArtistRegistryV1"),
        borsh.struct([], "PackTraitsV1"),
        borsh.struct([], "PackUploadsV1"),
        borsh.struct([], "ZeroOpenHolderV1"),
        borsh.struct([], "BurnDepositV1"),
        borsh.struct([], "GlobalBurnTrackV1"),
        borsh.struct([], "ArtistBurnTrackV1"),
        borsh.struct([], "SecureHolderV1"),
        borsh.struct([], "RevealerForMeV1"),
        borsh.struct([], "ThreeIdV1"),
        borsh.struct([], "DonationRegistryV1"),
        borsh.struct([], "PoolVaultV1"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=AccountClass.js.map