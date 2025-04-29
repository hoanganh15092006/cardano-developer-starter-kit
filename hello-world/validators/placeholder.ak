// use aiken/collection/list
// use aiken/crypto.{VerificationKeyHash}
// use cardano/script_context.{ScriptContext}

use aiken/primitive/string
use cardano/transaction.{OutputReference, Transaction}


pub type Redeemer {
    msg: ByteArray,
}

validator alwayssuccess {
    spend(
        _datum: Option<Data>,
        redeemer: Redeemer,
        _utxo: OutputReference,
        _self: Transaction,
    ) {
        // ctx: ScriptContext
        trace @"redeemer": string.from_bytearray(redeemer.msg)
        let a = True
        a?
    }

    else(_) {
        fail
    }
}