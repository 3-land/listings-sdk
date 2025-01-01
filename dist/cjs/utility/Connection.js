"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
exports.createKeypairFromSecretKey = createKeypairFromSecretKey;
const web3_js_1 = require("@solana/web3.js");
function getConnection(endpoint) {
    return new web3_js_1.Connection(endpoint);
}
function createKeypairFromSecretKey(secretKey) {
    return web3_js_1.Keypair.fromSecretKey(secretKey);
}
//# sourceMappingURL=Connection.js.map