<script>
    import { toHex } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
    import { Button } from "bits-ui";

    let sk = "0xSatoshiNakamoto";
    let address = "0xHalFinney";
    let amount = "0";

    $: console.log(sk);

    async function transfer() {
        const res = await fetch(`http://localhost:3042/transfer`, {
            method: "POST",
            body: JSON.stringify({
                signature: null,
                address: null,
                amount: 0,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }
</script>

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Transfer</h1>
    <hr />
    <div class="p-2">
        <div class="grid m-2">
            <label for="sk" class="m-1">Enter your private key:</label>
            <input
                type="text"
                name="sk"
                class="bg-slate-500 rounded p-1 w-[40rem]"
                bind:value={sk}
            />
        </div>
        <div class="grid m-2">
            <label for="address" class="m-1">Receiving Address:</label>
            <input
                type="text"
                name="address"
                class="bg-slate-500 rounded p-1 w-[40rem]"
                bind:value={address}
            />
        </div>
        <div class="grid m-2">
            <label for="amount" class="m-1">Amount to send:</label>
            <input
                type="text"
                name="amount"
                class="bg-slate-500 rounded p-1 w-[40rem]"
                bind:value={amount}
            />
        </div>
    </div>
    <div class="inline-flex items-center justify-center">
        <Button.Root
            class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
  hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
        >
            Transfer
        </Button.Root>
    </div>
</div>
