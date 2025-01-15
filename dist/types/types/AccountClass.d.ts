import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface HolderV1JSON {
    kind: "HolderV1";
}
export declare class HolderV1 {
    static readonly discriminator = 0;
    static readonly kind = "HolderV1";
    readonly discriminator = 0;
    readonly kind = "HolderV1";
    toJSON(): HolderV1JSON;
    toEncodable(): {
        HolderV1: {};
    };
}
export interface StoreV1JSON {
    kind: "StoreV1";
}
export declare class StoreV1 {
    static readonly discriminator = 1;
    static readonly kind = "StoreV1";
    readonly discriminator = 1;
    readonly kind = "StoreV1";
    toJSON(): StoreV1JSON;
    toEncodable(): {
        StoreV1: {};
    };
}
export interface SingleV1JSON {
    kind: "SingleV1";
}
export declare class SingleV1 {
    static readonly discriminator = 2;
    static readonly kind = "SingleV1";
    readonly discriminator = 2;
    readonly kind = "SingleV1";
    toJSON(): SingleV1JSON;
    toEncodable(): {
        SingleV1: {};
    };
}
export interface PackV1JSON {
    kind: "PackV1";
}
export declare class PackV1 {
    static readonly discriminator = 3;
    static readonly kind = "PackV1";
    readonly discriminator = 3;
    readonly kind = "PackV1";
    toJSON(): PackV1JSON;
    toEncodable(): {
        PackV1: {};
    };
}
export interface CardV1JSON {
    kind: "CardV1";
}
export declare class CardV1 {
    static readonly discriminator = 4;
    static readonly kind = "CardV1";
    readonly discriminator = 4;
    readonly kind = "CardV1";
    toJSON(): CardV1JSON;
    toEncodable(): {
        CardV1: {};
    };
}
export interface PackReceiptV1JSON {
    kind: "PackReceiptV1";
}
export declare class PackReceiptV1 {
    static readonly discriminator = 5;
    static readonly kind = "PackReceiptV1";
    readonly discriminator = 5;
    readonly kind = "PackReceiptV1";
    toJSON(): PackReceiptV1JSON;
    toEncodable(): {
        PackReceiptV1: {};
    };
}
export interface PackContentV1JSON {
    kind: "PackContentV1";
}
export declare class PackContentV1 {
    static readonly discriminator = 6;
    static readonly kind = "PackContentV1";
    readonly discriminator = 6;
    readonly kind = "PackContentV1";
    toJSON(): PackContentV1JSON;
    toEncodable(): {
        PackContentV1: {};
    };
}
export interface PackOpenHolderV1JSON {
    kind: "PackOpenHolderV1";
}
export declare class PackOpenHolderV1 {
    static readonly discriminator = 7;
    static readonly kind = "PackOpenHolderV1";
    readonly discriminator = 7;
    readonly kind = "PackOpenHolderV1";
    toJSON(): PackOpenHolderV1JSON;
    toEncodable(): {
        PackOpenHolderV1: {};
    };
}
export interface BuyTrackV1JSON {
    kind: "BuyTrackV1";
}
export declare class BuyTrackV1 {
    static readonly discriminator = 8;
    static readonly kind = "BuyTrackV1";
    readonly discriminator = 8;
    readonly kind = "BuyTrackV1";
    toJSON(): BuyTrackV1JSON;
    toEncodable(): {
        BuyTrackV1: {};
    };
}
export interface SingleArchiveV1JSON {
    kind: "SingleArchiveV1";
}
export declare class SingleArchiveV1 {
    static readonly discriminator = 9;
    static readonly kind = "SingleArchiveV1";
    readonly discriminator = 9;
    readonly kind = "SingleArchiveV1";
    toJSON(): SingleArchiveV1JSON;
    toEncodable(): {
        SingleArchiveV1: {};
    };
}
export interface PackArchiveV1JSON {
    kind: "PackArchiveV1";
}
export declare class PackArchiveV1 {
    static readonly discriminator = 10;
    static readonly kind = "PackArchiveV1";
    readonly discriminator = 10;
    readonly kind = "PackArchiveV1";
    toJSON(): PackArchiveV1JSON;
    toEncodable(): {
        PackArchiveV1: {};
    };
}
export interface NoneJSON {
    kind: "None";
}
export declare class None {
    static readonly discriminator = 11;
    static readonly kind = "None";
    readonly discriminator = 11;
    readonly kind = "None";
    toJSON(): NoneJSON;
    toEncodable(): {
        None: {};
    };
}
export interface CreatorRegistryV1JSON {
    kind: "CreatorRegistryV1";
}
export declare class CreatorRegistryV1 {
    static readonly discriminator = 12;
    static readonly kind = "CreatorRegistryV1";
    readonly discriminator = 12;
    readonly kind = "CreatorRegistryV1";
    toJSON(): CreatorRegistryV1JSON;
    toEncodable(): {
        CreatorRegistryV1: {};
    };
}
export interface CollectorGlobalRegistryV1JSON {
    kind: "CollectorGlobalRegistryV1";
}
export declare class CollectorGlobalRegistryV1 {
    static readonly discriminator = 13;
    static readonly kind = "CollectorGlobalRegistryV1";
    readonly discriminator = 13;
    readonly kind = "CollectorGlobalRegistryV1";
    toJSON(): CollectorGlobalRegistryV1JSON;
    toEncodable(): {
        CollectorGlobalRegistryV1: {};
    };
}
export interface CollectorArtistRegistryV1JSON {
    kind: "CollectorArtistRegistryV1";
}
export declare class CollectorArtistRegistryV1 {
    static readonly discriminator = 14;
    static readonly kind = "CollectorArtistRegistryV1";
    readonly discriminator = 14;
    readonly kind = "CollectorArtistRegistryV1";
    toJSON(): CollectorArtistRegistryV1JSON;
    toEncodable(): {
        CollectorArtistRegistryV1: {};
    };
}
export interface PackTraitsV1JSON {
    kind: "PackTraitsV1";
}
export declare class PackTraitsV1 {
    static readonly discriminator = 15;
    static readonly kind = "PackTraitsV1";
    readonly discriminator = 15;
    readonly kind = "PackTraitsV1";
    toJSON(): PackTraitsV1JSON;
    toEncodable(): {
        PackTraitsV1: {};
    };
}
export interface PackUploadsV1JSON {
    kind: "PackUploadsV1";
}
export declare class PackUploadsV1 {
    static readonly discriminator = 16;
    static readonly kind = "PackUploadsV1";
    readonly discriminator = 16;
    readonly kind = "PackUploadsV1";
    toJSON(): PackUploadsV1JSON;
    toEncodable(): {
        PackUploadsV1: {};
    };
}
export interface ZeroOpenHolderV1JSON {
    kind: "ZeroOpenHolderV1";
}
export declare class ZeroOpenHolderV1 {
    static readonly discriminator = 17;
    static readonly kind = "ZeroOpenHolderV1";
    readonly discriminator = 17;
    readonly kind = "ZeroOpenHolderV1";
    toJSON(): ZeroOpenHolderV1JSON;
    toEncodable(): {
        ZeroOpenHolderV1: {};
    };
}
export interface BurnDepositV1JSON {
    kind: "BurnDepositV1";
}
export declare class BurnDepositV1 {
    static readonly discriminator = 18;
    static readonly kind = "BurnDepositV1";
    readonly discriminator = 18;
    readonly kind = "BurnDepositV1";
    toJSON(): BurnDepositV1JSON;
    toEncodable(): {
        BurnDepositV1: {};
    };
}
export interface GlobalBurnTrackV1JSON {
    kind: "GlobalBurnTrackV1";
}
export declare class GlobalBurnTrackV1 {
    static readonly discriminator = 19;
    static readonly kind = "GlobalBurnTrackV1";
    readonly discriminator = 19;
    readonly kind = "GlobalBurnTrackV1";
    toJSON(): GlobalBurnTrackV1JSON;
    toEncodable(): {
        GlobalBurnTrackV1: {};
    };
}
export interface ArtistBurnTrackV1JSON {
    kind: "ArtistBurnTrackV1";
}
export declare class ArtistBurnTrackV1 {
    static readonly discriminator = 20;
    static readonly kind = "ArtistBurnTrackV1";
    readonly discriminator = 20;
    readonly kind = "ArtistBurnTrackV1";
    toJSON(): ArtistBurnTrackV1JSON;
    toEncodable(): {
        ArtistBurnTrackV1: {};
    };
}
export interface SecureHolderV1JSON {
    kind: "SecureHolderV1";
}
export declare class SecureHolderV1 {
    static readonly discriminator = 21;
    static readonly kind = "SecureHolderV1";
    readonly discriminator = 21;
    readonly kind = "SecureHolderV1";
    toJSON(): SecureHolderV1JSON;
    toEncodable(): {
        SecureHolderV1: {};
    };
}
export interface RevealerForMeV1JSON {
    kind: "RevealerForMeV1";
}
export declare class RevealerForMeV1 {
    static readonly discriminator = 22;
    static readonly kind = "RevealerForMeV1";
    readonly discriminator = 22;
    readonly kind = "RevealerForMeV1";
    toJSON(): RevealerForMeV1JSON;
    toEncodable(): {
        RevealerForMeV1: {};
    };
}
export interface ThreeIdV1JSON {
    kind: "ThreeIdV1";
}
export declare class ThreeIdV1 {
    static readonly discriminator = 23;
    static readonly kind = "ThreeIdV1";
    readonly discriminator = 23;
    readonly kind = "ThreeIdV1";
    toJSON(): ThreeIdV1JSON;
    toEncodable(): {
        ThreeIdV1: {};
    };
}
export interface DonationRegistryV1JSON {
    kind: "DonationRegistryV1";
}
export declare class DonationRegistryV1 {
    static readonly discriminator = 24;
    static readonly kind = "DonationRegistryV1";
    readonly discriminator = 24;
    readonly kind = "DonationRegistryV1";
    toJSON(): DonationRegistryV1JSON;
    toEncodable(): {
        DonationRegistryV1: {};
    };
}
export interface PoolVaultV1JSON {
    kind: "PoolVaultV1";
}
export declare class PoolVaultV1 {
    static readonly discriminator = 25;
    static readonly kind = "PoolVaultV1";
    readonly discriminator = 25;
    readonly kind = "PoolVaultV1";
    toJSON(): PoolVaultV1JSON;
    toEncodable(): {
        PoolVaultV1: {};
    };
}
export declare function fromDecoded(obj: any): types.AccountClassKind;
export declare function fromJSON(obj: types.AccountClassJSON): types.AccountClassKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=AccountClass.d.ts.map