import { Blockfrost, Lucid, Crypto, fromText, Data } from "https://deno.land/x/lucid/mod.ts";

// Provider selection
// There are multiple builtin providers you can choose from in Lucid.

// Blockfrost
const lucid = new Lucid({
  provider: new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    "previewl3ZqNkqIuTDP3EjYSceodsmdKGXIr5ic"
  ),
});

console.log(lucid);



const seed = "dinner sound leaf ceiling say loud angry topic drop leisure property build movie capable minimum scare pen foam wise satoshi trial dress logic tiger"
lucid.selectWalletFromSeed(seed, { addressType: "Base", index: 0 });

// console.log(lucid);


// get address

const address = await lucid.wallet.address(); // Bech32 address
console.log(`Đ/c ví gửi: ${address}`); // Hiện thị địa chỉ ví


// query utxo

const utxos = await lucid.wallet.getUtxos();
// const utxos = await lucid.utxosAt(address);
console.log(utxos); // Hiển thị toàn bộ UTXOs


const utxo = utxos[1];
// console.log(utxo); // Hiện thị 1 UTxO
// // console.log(`lovelace: ${utxo.assets.lovelace}`) // Hiện thị 1 UTxO



// Lấy thông tin assets từ UTxO
const assets = utxo.assets;




// Hiển thị thông tin assets
console.log("Assets:", assets);




// // Hiển thị toàn bộ tài sản và giá trị của chúng
for (const assetname in assets) {
  console.log(`Assetname: ${assetname}, Value: ${assets[assetname]}`);
}



// // Query scriptUTxo
const [scriptUtxo] = await lucid.utxosAt("addr_test1qqftxx64wa84u6f6kp4jm8meql7kmz25x8jn8l05eyzpdfwjp3p4rmnr904yawqgp9aqyz4tlhxpf2m9l6hlxe3e4ljspq3jn8");
console.log(scriptUtxo);
// const datum = await lucid.datumOf(scriptUtxo);

// // // const datum = await lucid.datumOf(scriptUtxo);
// // // console.log(datum);

// // tại địa chỉ có smart contract thì mới có datum



// // create transaction

//  const tx = await lucid.newTx()
//   .payTo("addr_test1qzldl9u0j6ap7mdugtdcre43f8dfrnv7uqd3a6furpyuzw3z70zawv8g3tyg7uh833x50geeul2vpyujyzac0d6dmgcsyu5akw", { lovelace: 64000000n})
//   .commit();




// // Sign transaction
// const signedTx = await tx.sign().commit();
// console.log(`signedTx: ${signedTx}`); // Hiện thị tx





// // Submit transaction
// const txHash = await signedTx.submit();




// print transaction hash
const toAddress = "addr_test1qzldl9u0j6ap7mdugtdcre43f8dfrnv7uqd3a6furpyuzw3z70zawv8g3tyg7uh833x50geeul2vpyujyzac0d6dmgcsyu5akw";
const amount = 64000000n;
const metadata = { msg: "Hello C2VN_BK03. This is metadata 674" };



// const tx = await lucid.newTx()
//   .payTo(toAddress, { lovelace: amount })
//   .attachMetadata(674, metadata)
//   .commit();



// const signedTx = await tx.sign().commit();

// const txHash = await signedTx.submit();
// console.log(`Mã giao dịch là: ${txHash}`);


// )



async function createSendNativeTokens(toAddress: string, policyId: string, assetName: string, amount: bigint) {
    const tx = await lucid.newTx()
        .payTo(toAddress, { [policyId + fromText(assetName)]: amount })
          .payTo(toAddress, { lovelace: 64000000n })
        .commit();
    return tx;
}

const tx = await createSendNativeTokens(toAddress, "acf94ecba7fc896edecc7814853b58b6dc14d34ee8c1a2023ea53fdc", "HA", 1n);

let signedTx = await tx.sign().commit();
let txHash = await signedTx.submit();
console.log(`Mã giao dịch là: ${txHash}`);




// async function createSendAdaWithDatum(toAddress: string, datum: any, amount: bigint) {
//     const tx = await lucid.newTx()
//         .payToWithData(toAddress, datum, { lovelace: amount })
//         .commit();
//     return tx;
// }




// const VestingSchema = Data.Object({
//     lock_until: Data.Integer(),
//     beneficiary: Data.Bytes(),
// });




// const deadlineDate: Date = new Date("2026-06-09T00:00:00Z");
// const deadlinePosix = BigInt(deadlineDate.getTime());

// const { payment } = Addresses.inspect(
//   "addr_test1qzjzr7f3yj3k4jky7schc55qjclaw6fhc3zfnrama9l3579hwurrx9w7uhz99zdc3fmmzwel6hac4042yywj15jhnls09rtm6",
// );

// const d = {
//   lock_until: deadlinePosix,
//   beneficiary: payment?.hash,
// };

// const datum = await Data.to<VestingSchema>(d, VestingSchema);

// console.log(datum);


// const deadline = BigInt(lucid.utils.unixTimeToSlots(Date.now() + 1));
// // Set the vesting deadline
// const deadlineDate = new Date("2023-03-20T20:00:00Z");
// const deadlinePosIx = BigInt(deadlineDate.getTime());
// console.log(deadlinePosIx);
// console.log(BigInt(lucid.utils.unixTimeToSlots(deadlinePosIx)));
// console.log(deadline);

// const tx = await createSendAdaWithDatum(toAddress, datum, amount);
// console.log(`${tx}`);


// let signedTx = await tx.sign().commit();
// let txHash = await signedTx.submit();
// console.log(`Mã giao dịch là: ${txHash}`);
// Deno.exit(0); // Thoát chương trình