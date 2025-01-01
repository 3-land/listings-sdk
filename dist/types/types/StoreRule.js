import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class ListingPerWallet {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "ListingPerWallet";
        this.value = {
            config: new types.ListingPerWalletArgs(Object.assign({}, value.config)),
        };
    }
    toJSON() {
        return {
            kind: "ListingPerWallet",
            value: {
                config: this.value.config.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            ListingPerWallet: {
                config: types.ListingPerWalletArgs.toEncodable(this.value.config),
            },
        };
    }
}
ListingPerWallet.discriminator = 0;
ListingPerWallet.kind = "ListingPerWallet";
export class AllowedCurrency {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "AllowedCurrency";
        this.value = {
            config: value.config,
        };
    }
    toJSON() {
        return {
            kind: "AllowedCurrency",
            value: {
                config: this.value.config.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            AllowedCurrency: {
                config: this.value.config.toEncodable(),
            },
        };
    }
}
AllowedCurrency.discriminator = 1;
AllowedCurrency.kind = "AllowedCurrency";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("ListingPerWallet" in obj) {
        const val = obj["ListingPerWallet"];
        return new ListingPerWallet({
            config: types.ListingPerWalletArgs.fromDecoded(val["config"]),
        });
    }
    if ("AllowedCurrency" in obj) {
        const val = obj["AllowedCurrency"];
        return new AllowedCurrency({
            config: types.CurrencyType.fromDecoded(val["config"]),
        });
    }
    throw new Error("Invalid enum object");
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case "ListingPerWallet": {
            return new ListingPerWallet({
                config: types.ListingPerWalletArgs.fromJSON(obj.value.config),
            });
        }
        case "AllowedCurrency": {
            return new AllowedCurrency({
                config: types.CurrencyType.fromJSON(obj.value.config),
            });
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([types.ListingPerWalletArgs.layout("config")], "ListingPerWallet"),
        borsh.struct([types.CurrencyType.layout("config")], "AllowedCurrency"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
