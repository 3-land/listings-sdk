export class InstructionMissing extends Error {
    constructor(logs) {
        super("100: 8 byte instruction identifier not provided");
        this.logs = logs;
        this.code = 100;
        this.name = "InstructionMissing";
        this.msg = "8 byte instruction identifier not provided";
    }
}
InstructionMissing.code = 100;
export class InstructionFallbackNotFound extends Error {
    constructor(logs) {
        super("101: Fallback functions are not supported");
        this.logs = logs;
        this.code = 101;
        this.name = "InstructionFallbackNotFound";
        this.msg = "Fallback functions are not supported";
    }
}
InstructionFallbackNotFound.code = 101;
export class InstructionDidNotDeserialize extends Error {
    constructor(logs) {
        super("102: The program could not deserialize the given instruction");
        this.logs = logs;
        this.code = 102;
        this.name = "InstructionDidNotDeserialize";
        this.msg = "The program could not deserialize the given instruction";
    }
}
InstructionDidNotDeserialize.code = 102;
export class InstructionDidNotSerialize extends Error {
    constructor(logs) {
        super("103: The program could not serialize the given instruction");
        this.logs = logs;
        this.code = 103;
        this.name = "InstructionDidNotSerialize";
        this.msg = "The program could not serialize the given instruction";
    }
}
InstructionDidNotSerialize.code = 103;
export class IdlInstructionStub extends Error {
    constructor(logs) {
        super("1000: The program was compiled without idl instructions");
        this.logs = logs;
        this.code = 1000;
        this.name = "IdlInstructionStub";
        this.msg = "The program was compiled without idl instructions";
    }
}
IdlInstructionStub.code = 1000;
export class IdlInstructionInvalidProgram extends Error {
    constructor(logs) {
        super("1001: The transaction was given an invalid program for the IDL instruction");
        this.logs = logs;
        this.code = 1001;
        this.name = "IdlInstructionInvalidProgram";
        this.msg = "The transaction was given an invalid program for the IDL instruction";
    }
}
IdlInstructionInvalidProgram.code = 1001;
export class ConstraintMut extends Error {
    constructor(logs) {
        super("2000: A mut constraint was violated");
        this.logs = logs;
        this.code = 2000;
        this.name = "ConstraintMut";
        this.msg = "A mut constraint was violated";
    }
}
ConstraintMut.code = 2000;
export class ConstraintHasOne extends Error {
    constructor(logs) {
        super("2001: A has one constraint was violated");
        this.logs = logs;
        this.code = 2001;
        this.name = "ConstraintHasOne";
        this.msg = "A has one constraint was violated";
    }
}
ConstraintHasOne.code = 2001;
export class ConstraintSigner extends Error {
    constructor(logs) {
        super("2002: A signer constraint was violated");
        this.logs = logs;
        this.code = 2002;
        this.name = "ConstraintSigner";
        this.msg = "A signer constraint was violated";
    }
}
ConstraintSigner.code = 2002;
export class ConstraintRaw extends Error {
    constructor(logs) {
        super("2003: A raw constraint was violated");
        this.logs = logs;
        this.code = 2003;
        this.name = "ConstraintRaw";
        this.msg = "A raw constraint was violated";
    }
}
ConstraintRaw.code = 2003;
export class ConstraintOwner extends Error {
    constructor(logs) {
        super("2004: An owner constraint was violated");
        this.logs = logs;
        this.code = 2004;
        this.name = "ConstraintOwner";
        this.msg = "An owner constraint was violated";
    }
}
ConstraintOwner.code = 2004;
export class ConstraintRentExempt extends Error {
    constructor(logs) {
        super("2005: A rent exemption constraint was violated");
        this.logs = logs;
        this.code = 2005;
        this.name = "ConstraintRentExempt";
        this.msg = "A rent exemption constraint was violated";
    }
}
ConstraintRentExempt.code = 2005;
export class ConstraintSeeds extends Error {
    constructor(logs) {
        super("2006: A seeds constraint was violated");
        this.logs = logs;
        this.code = 2006;
        this.name = "ConstraintSeeds";
        this.msg = "A seeds constraint was violated";
    }
}
ConstraintSeeds.code = 2006;
export class ConstraintExecutable extends Error {
    constructor(logs) {
        super("2007: An executable constraint was violated");
        this.logs = logs;
        this.code = 2007;
        this.name = "ConstraintExecutable";
        this.msg = "An executable constraint was violated";
    }
}
ConstraintExecutable.code = 2007;
export class ConstraintState extends Error {
    constructor(logs) {
        super("2008: Deprecated Error, feel free to replace with something else");
        this.logs = logs;
        this.code = 2008;
        this.name = "ConstraintState";
        this.msg = "Deprecated Error, feel free to replace with something else";
    }
}
ConstraintState.code = 2008;
export class ConstraintAssociated extends Error {
    constructor(logs) {
        super("2009: An associated constraint was violated");
        this.logs = logs;
        this.code = 2009;
        this.name = "ConstraintAssociated";
        this.msg = "An associated constraint was violated";
    }
}
ConstraintAssociated.code = 2009;
export class ConstraintAssociatedInit extends Error {
    constructor(logs) {
        super("2010: An associated init constraint was violated");
        this.logs = logs;
        this.code = 2010;
        this.name = "ConstraintAssociatedInit";
        this.msg = "An associated init constraint was violated";
    }
}
ConstraintAssociatedInit.code = 2010;
export class ConstraintClose extends Error {
    constructor(logs) {
        super("2011: A close constraint was violated");
        this.logs = logs;
        this.code = 2011;
        this.name = "ConstraintClose";
        this.msg = "A close constraint was violated";
    }
}
ConstraintClose.code = 2011;
export class ConstraintAddress extends Error {
    constructor(logs) {
        super("2012: An address constraint was violated");
        this.logs = logs;
        this.code = 2012;
        this.name = "ConstraintAddress";
        this.msg = "An address constraint was violated";
    }
}
ConstraintAddress.code = 2012;
export class ConstraintZero extends Error {
    constructor(logs) {
        super("2013: Expected zero account discriminant");
        this.logs = logs;
        this.code = 2013;
        this.name = "ConstraintZero";
        this.msg = "Expected zero account discriminant";
    }
}
ConstraintZero.code = 2013;
export class ConstraintTokenMint extends Error {
    constructor(logs) {
        super("2014: A token mint constraint was violated");
        this.logs = logs;
        this.code = 2014;
        this.name = "ConstraintTokenMint";
        this.msg = "A token mint constraint was violated";
    }
}
ConstraintTokenMint.code = 2014;
export class ConstraintTokenOwner extends Error {
    constructor(logs) {
        super("2015: A token owner constraint was violated");
        this.logs = logs;
        this.code = 2015;
        this.name = "ConstraintTokenOwner";
        this.msg = "A token owner constraint was violated";
    }
}
ConstraintTokenOwner.code = 2015;
export class ConstraintMintMintAuthority extends Error {
    constructor(logs) {
        super("2016: A mint mint authority constraint was violated");
        this.logs = logs;
        this.code = 2016;
        this.name = "ConstraintMintMintAuthority";
        this.msg = "A mint mint authority constraint was violated";
    }
}
ConstraintMintMintAuthority.code = 2016;
export class ConstraintMintFreezeAuthority extends Error {
    constructor(logs) {
        super("2017: A mint freeze authority constraint was violated");
        this.logs = logs;
        this.code = 2017;
        this.name = "ConstraintMintFreezeAuthority";
        this.msg = "A mint freeze authority constraint was violated";
    }
}
ConstraintMintFreezeAuthority.code = 2017;
export class ConstraintMintDecimals extends Error {
    constructor(logs) {
        super("2018: A mint decimals constraint was violated");
        this.logs = logs;
        this.code = 2018;
        this.name = "ConstraintMintDecimals";
        this.msg = "A mint decimals constraint was violated";
    }
}
ConstraintMintDecimals.code = 2018;
export class ConstraintSpace extends Error {
    constructor(logs) {
        super("2019: A space constraint was violated");
        this.logs = logs;
        this.code = 2019;
        this.name = "ConstraintSpace";
        this.msg = "A space constraint was violated";
    }
}
ConstraintSpace.code = 2019;
export class ConstraintAccountIsNone extends Error {
    constructor(logs) {
        super("2020: A required account for the constraint is None");
        this.logs = logs;
        this.code = 2020;
        this.name = "ConstraintAccountIsNone";
        this.msg = "A required account for the constraint is None";
    }
}
ConstraintAccountIsNone.code = 2020;
export class RequireViolated extends Error {
    constructor(logs) {
        super("2500: A require expression was violated");
        this.logs = logs;
        this.code = 2500;
        this.name = "RequireViolated";
        this.msg = "A require expression was violated";
    }
}
RequireViolated.code = 2500;
export class RequireEqViolated extends Error {
    constructor(logs) {
        super("2501: A require_eq expression was violated");
        this.logs = logs;
        this.code = 2501;
        this.name = "RequireEqViolated";
        this.msg = "A require_eq expression was violated";
    }
}
RequireEqViolated.code = 2501;
export class RequireKeysEqViolated extends Error {
    constructor(logs) {
        super("2502: A require_keys_eq expression was violated");
        this.logs = logs;
        this.code = 2502;
        this.name = "RequireKeysEqViolated";
        this.msg = "A require_keys_eq expression was violated";
    }
}
RequireKeysEqViolated.code = 2502;
export class RequireNeqViolated extends Error {
    constructor(logs) {
        super("2503: A require_neq expression was violated");
        this.logs = logs;
        this.code = 2503;
        this.name = "RequireNeqViolated";
        this.msg = "A require_neq expression was violated";
    }
}
RequireNeqViolated.code = 2503;
export class RequireKeysNeqViolated extends Error {
    constructor(logs) {
        super("2504: A require_keys_neq expression was violated");
        this.logs = logs;
        this.code = 2504;
        this.name = "RequireKeysNeqViolated";
        this.msg = "A require_keys_neq expression was violated";
    }
}
RequireKeysNeqViolated.code = 2504;
export class RequireGtViolated extends Error {
    constructor(logs) {
        super("2505: A require_gt expression was violated");
        this.logs = logs;
        this.code = 2505;
        this.name = "RequireGtViolated";
        this.msg = "A require_gt expression was violated";
    }
}
RequireGtViolated.code = 2505;
export class RequireGteViolated extends Error {
    constructor(logs) {
        super("2506: A require_gte expression was violated");
        this.logs = logs;
        this.code = 2506;
        this.name = "RequireGteViolated";
        this.msg = "A require_gte expression was violated";
    }
}
RequireGteViolated.code = 2506;
export class AccountDiscriminatorAlreadySet extends Error {
    constructor(logs) {
        super("3000: The account discriminator was already set on this account");
        this.logs = logs;
        this.code = 3000;
        this.name = "AccountDiscriminatorAlreadySet";
        this.msg = "The account discriminator was already set on this account";
    }
}
AccountDiscriminatorAlreadySet.code = 3000;
export class AccountDiscriminatorNotFound extends Error {
    constructor(logs) {
        super("3001: No 8 byte discriminator was found on the account");
        this.logs = logs;
        this.code = 3001;
        this.name = "AccountDiscriminatorNotFound";
        this.msg = "No 8 byte discriminator was found on the account";
    }
}
AccountDiscriminatorNotFound.code = 3001;
export class AccountDiscriminatorMismatch extends Error {
    constructor(logs) {
        super("3002: 8 byte discriminator did not match what was expected");
        this.logs = logs;
        this.code = 3002;
        this.name = "AccountDiscriminatorMismatch";
        this.msg = "8 byte discriminator did not match what was expected";
    }
}
AccountDiscriminatorMismatch.code = 3002;
export class AccountDidNotDeserialize extends Error {
    constructor(logs) {
        super("3003: Failed to deserialize the account");
        this.logs = logs;
        this.code = 3003;
        this.name = "AccountDidNotDeserialize";
        this.msg = "Failed to deserialize the account";
    }
}
AccountDidNotDeserialize.code = 3003;
export class AccountDidNotSerialize extends Error {
    constructor(logs) {
        super("3004: Failed to serialize the account");
        this.logs = logs;
        this.code = 3004;
        this.name = "AccountDidNotSerialize";
        this.msg = "Failed to serialize the account";
    }
}
AccountDidNotSerialize.code = 3004;
export class AccountNotEnoughKeys extends Error {
    constructor(logs) {
        super("3005: Not enough account keys given to the instruction");
        this.logs = logs;
        this.code = 3005;
        this.name = "AccountNotEnoughKeys";
        this.msg = "Not enough account keys given to the instruction";
    }
}
AccountNotEnoughKeys.code = 3005;
export class AccountNotMutable extends Error {
    constructor(logs) {
        super("3006: The given account is not mutable");
        this.logs = logs;
        this.code = 3006;
        this.name = "AccountNotMutable";
        this.msg = "The given account is not mutable";
    }
}
AccountNotMutable.code = 3006;
export class AccountOwnedByWrongProgram extends Error {
    constructor(logs) {
        super("3007: The given account is owned by a different program than expected");
        this.logs = logs;
        this.code = 3007;
        this.name = "AccountOwnedByWrongProgram";
        this.msg = "The given account is owned by a different program than expected";
    }
}
AccountOwnedByWrongProgram.code = 3007;
export class InvalidProgramId extends Error {
    constructor(logs) {
        super("3008: Program ID was not as expected");
        this.logs = logs;
        this.code = 3008;
        this.name = "InvalidProgramId";
        this.msg = "Program ID was not as expected";
    }
}
InvalidProgramId.code = 3008;
export class InvalidProgramExecutable extends Error {
    constructor(logs) {
        super("3009: Program account is not executable");
        this.logs = logs;
        this.code = 3009;
        this.name = "InvalidProgramExecutable";
        this.msg = "Program account is not executable";
    }
}
InvalidProgramExecutable.code = 3009;
export class AccountNotSigner extends Error {
    constructor(logs) {
        super("3010: The given account did not sign");
        this.logs = logs;
        this.code = 3010;
        this.name = "AccountNotSigner";
        this.msg = "The given account did not sign";
    }
}
AccountNotSigner.code = 3010;
export class AccountNotSystemOwned extends Error {
    constructor(logs) {
        super("3011: The given account is not owned by the system program");
        this.logs = logs;
        this.code = 3011;
        this.name = "AccountNotSystemOwned";
        this.msg = "The given account is not owned by the system program";
    }
}
AccountNotSystemOwned.code = 3011;
export class AccountNotInitialized extends Error {
    constructor(logs) {
        super("3012: The program expected this account to be already initialized");
        this.logs = logs;
        this.code = 3012;
        this.name = "AccountNotInitialized";
        this.msg = "The program expected this account to be already initialized";
    }
}
AccountNotInitialized.code = 3012;
export class AccountNotProgramData extends Error {
    constructor(logs) {
        super("3013: The given account is not a program data account");
        this.logs = logs;
        this.code = 3013;
        this.name = "AccountNotProgramData";
        this.msg = "The given account is not a program data account";
    }
}
AccountNotProgramData.code = 3013;
export class AccountNotAssociatedTokenAccount extends Error {
    constructor(logs) {
        super("3014: The given account is not the associated token account");
        this.logs = logs;
        this.code = 3014;
        this.name = "AccountNotAssociatedTokenAccount";
        this.msg = "The given account is not the associated token account";
    }
}
AccountNotAssociatedTokenAccount.code = 3014;
export class AccountSysvarMismatch extends Error {
    constructor(logs) {
        super("3015: The given public key does not match the required sysvar");
        this.logs = logs;
        this.code = 3015;
        this.name = "AccountSysvarMismatch";
        this.msg = "The given public key does not match the required sysvar";
    }
}
AccountSysvarMismatch.code = 3015;
export class AccountReallocExceedsLimit extends Error {
    constructor(logs) {
        super("3016: The account reallocation exceeds the MAX_PERMITTED_DATA_INCREASE limit");
        this.logs = logs;
        this.code = 3016;
        this.name = "AccountReallocExceedsLimit";
        this.msg = "The account reallocation exceeds the MAX_PERMITTED_DATA_INCREASE limit";
    }
}
AccountReallocExceedsLimit.code = 3016;
export class AccountDuplicateReallocs extends Error {
    constructor(logs) {
        super("3017: The account was duplicated for more than one reallocation");
        this.logs = logs;
        this.code = 3017;
        this.name = "AccountDuplicateReallocs";
        this.msg = "The account was duplicated for more than one reallocation";
    }
}
AccountDuplicateReallocs.code = 3017;
export class DeclaredProgramIdMismatch extends Error {
    constructor(logs) {
        super("4100: The declared program id does not match the actual program id");
        this.logs = logs;
        this.code = 4100;
        this.name = "DeclaredProgramIdMismatch";
        this.msg = "The declared program id does not match the actual program id";
    }
}
DeclaredProgramIdMismatch.code = 4100;
export class Deprecated extends Error {
    constructor(logs) {
        super("5000: The API being used is deprecated and should no longer be used");
        this.logs = logs;
        this.code = 5000;
        this.name = "Deprecated";
        this.msg = "The API being used is deprecated and should no longer be used";
    }
}
Deprecated.code = 5000;
export function fromCode(code, logs) {
    switch (code) {
        case 100:
            return new InstructionMissing(logs);
        case 101:
            return new InstructionFallbackNotFound(logs);
        case 102:
            return new InstructionDidNotDeserialize(logs);
        case 103:
            return new InstructionDidNotSerialize(logs);
        case 1000:
            return new IdlInstructionStub(logs);
        case 1001:
            return new IdlInstructionInvalidProgram(logs);
        case 2000:
            return new ConstraintMut(logs);
        case 2001:
            return new ConstraintHasOne(logs);
        case 2002:
            return new ConstraintSigner(logs);
        case 2003:
            return new ConstraintRaw(logs);
        case 2004:
            return new ConstraintOwner(logs);
        case 2005:
            return new ConstraintRentExempt(logs);
        case 2006:
            return new ConstraintSeeds(logs);
        case 2007:
            return new ConstraintExecutable(logs);
        case 2008:
            return new ConstraintState(logs);
        case 2009:
            return new ConstraintAssociated(logs);
        case 2010:
            return new ConstraintAssociatedInit(logs);
        case 2011:
            return new ConstraintClose(logs);
        case 2012:
            return new ConstraintAddress(logs);
        case 2013:
            return new ConstraintZero(logs);
        case 2014:
            return new ConstraintTokenMint(logs);
        case 2015:
            return new ConstraintTokenOwner(logs);
        case 2016:
            return new ConstraintMintMintAuthority(logs);
        case 2017:
            return new ConstraintMintFreezeAuthority(logs);
        case 2018:
            return new ConstraintMintDecimals(logs);
        case 2019:
            return new ConstraintSpace(logs);
        case 2020:
            return new ConstraintAccountIsNone(logs);
        case 2500:
            return new RequireViolated(logs);
        case 2501:
            return new RequireEqViolated(logs);
        case 2502:
            return new RequireKeysEqViolated(logs);
        case 2503:
            return new RequireNeqViolated(logs);
        case 2504:
            return new RequireKeysNeqViolated(logs);
        case 2505:
            return new RequireGtViolated(logs);
        case 2506:
            return new RequireGteViolated(logs);
        case 3000:
            return new AccountDiscriminatorAlreadySet(logs);
        case 3001:
            return new AccountDiscriminatorNotFound(logs);
        case 3002:
            return new AccountDiscriminatorMismatch(logs);
        case 3003:
            return new AccountDidNotDeserialize(logs);
        case 3004:
            return new AccountDidNotSerialize(logs);
        case 3005:
            return new AccountNotEnoughKeys(logs);
        case 3006:
            return new AccountNotMutable(logs);
        case 3007:
            return new AccountOwnedByWrongProgram(logs);
        case 3008:
            return new InvalidProgramId(logs);
        case 3009:
            return new InvalidProgramExecutable(logs);
        case 3010:
            return new AccountNotSigner(logs);
        case 3011:
            return new AccountNotSystemOwned(logs);
        case 3012:
            return new AccountNotInitialized(logs);
        case 3013:
            return new AccountNotProgramData(logs);
        case 3014:
            return new AccountNotAssociatedTokenAccount(logs);
        case 3015:
            return new AccountSysvarMismatch(logs);
        case 3016:
            return new AccountReallocExceedsLimit(logs);
        case 3017:
            return new AccountDuplicateReallocs(logs);
        case 4100:
            return new DeclaredProgramIdMismatch(logs);
        case 5000:
            return new Deprecated(logs);
    }
    return null;
}
