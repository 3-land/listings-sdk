import { PROGRAM_ID } from "../programId";
import * as anchor from "./anchor";
export function fromCode(code, logs) {
    return anchor.fromCode(code, logs);
}
function hasOwnProperty(obj, prop) {
    return Object.hasOwnProperty.call(obj, prop);
}
const errorRe = /Program (\w+) failed: custom program error: (\w+)/;
export function fromTxError(err, programId = PROGRAM_ID) {
    if (typeof err !== "object" ||
        err === null ||
        !hasOwnProperty(err, "logs") ||
        !Array.isArray(err.logs)) {
        return null;
    }
    let firstMatch = null;
    for (const logLine of err.logs) {
        firstMatch = errorRe.exec(logLine);
        if (firstMatch !== null) {
            break;
        }
    }
    if (firstMatch === null) {
        return null;
    }
    const [programIdRaw, codeRaw] = firstMatch.slice(1);
    if (programIdRaw !== programId.toString()) {
        return null;
    }
    let errorCode;
    try {
        errorCode = parseInt(codeRaw, 16);
    }
    catch (parseErr) {
        return null;
    }
    return fromCode(errorCode, err.logs);
}
