use aiken/primitive/string
// use aiken/collection/list
// use aiken/crypto.{VerificationKeyHash}
// use aiken/primitive/string
// use cardano/script_context.{ScriptContext}
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
    value: ByteArray,
}

pub type Redeemer {
    value: ByteArray,
}

validator compare_datum_redeemer {
    spend(
        datum: Option<Datum>,
// Dữ liệu đi kèm với UTxO
        redeemer: Redeemer,
// Dữ liệu được cung cấp khi sử dụng UTxO
        _utxo: OutputReference,
        _self: Transaction,
    ) {
        // ctx: ScriptContext,
        expect Some(datum_input) = datum
        let d: Datum = datum_input
        trace @"redeemer": string.from_bytearray(redeemer.value)
        let a = d.value == redeemer.value
        a?
        // True
    }


else(_) {
    fail
}
}

// ...rest of the code is unchanged

test datum_redeemer_example() {
    let datum = Datum { value: "Hello, World!" }
    let redeemer = Redeemer { value: "Hello, World!" }

    let placeholder_utxo =
        OutputReference { transaction_id: "#", output_index: 0 }

    // let placeholder_transaction =
    //     Transaction { ..transaction.placeholder, extra_signatories: [] }
    compare_datum_redeemer.spend(
        Some(datum),
        redeemer,
        placeholder_utxo,
        // placeholder_transaction,
        Transaction { ..transaction.placeholder, extra_signatories: [datum.value] },
    )
}
