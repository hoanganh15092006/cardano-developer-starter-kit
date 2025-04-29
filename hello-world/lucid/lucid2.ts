import { Blockfrost, Lucid, Crypto, fromText, Data, Addresses,  } from "https://deno.land/x/lucid/mod.ts";

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

console.log(lucid);


// get address

const address = await lucid.wallet.address(); // Bech32 address
console.log(`Đ/c ví gửi: ${address}`); // Hiện thị địa chỉ ví

async function createMintingscripts(slot_in: bigint) {
  const { payment } = Addresses.inspect(
    await lucid.wallet.address(),
  );

  const mintingScripts = lucid.newScript(
    {
      type: "All",
      scripts: [
        { type: "Sig", keyHash: payment.hash },
        {
          type: "Before",
          slot: slot_in,
        },
      ],
    }
  );

  return mintingScripts;
}






//=======mintToken=======
async function mintToken(policyId: string, tokenName: string, amount: bigint, slot_in: bigint) {
    const unit = policyId + fromText(tokenName);

//=======Tạo metadata=======


  const metadata = {
    [policyId]: {
      [tokenName]: {
        description: "This is Token minted by LUCID",
        name: `${tokenName}`,
        id: 1,
        image: "ipfs://QmdLrVqtMiaD4bv3kt4CZqt8xxAKNpNS1GyBLHytTVuAqz"
      }
    }
  };

  console.log(metadata);



const tx = await lucid.newTx()
  .mint({ [unit]: amount })
  .validTo(Date.now() + 200000)
  .attachScript(await createMintingscripts(slot_in))
  .attachMetadata(721, metadata)
  .commit();

  return tx;
}



//=============burnToken=============
async function burnToken(policyId: string, tokenName: string, amount: bigint, slot_in: bigint) {
    const unit = policyId + fromText(tokenName);

    const tx = await lucid.newTx()
        .mint({ [unit]: -amount })
        .validTo(Date.now() + 200000)
        .attachScript(await createMintingscripts(slot_in))
        .commit();

    return tx;
}










//====================Main====================

// const slot_in = BigInt(lucid.utils.unixTimeToSlots(Date.now()+100000000)); //BigInt(84885593)//

const slot_in = BigInt(79350998);
console.log(`Slot: ${slot_in}`);


const mintingScripts = await createMintingscripts(slot_in);

const policyId = mintingScripts.toHash(); // Lấy mã chính sách minting
console.log(`Mã chính sách minting là: ${policyId}`);



// Mint token
const tx = await mintToken(policyId, "BK03:64", 500n, slot_in);

let signedtx = await tx.sign().commit();
let txHash = await signedtx.submit();
console.log(`Bạn có thể kiểm tra giao dịch tại: https://preview.explorer.io/tx/${txHash}`);






