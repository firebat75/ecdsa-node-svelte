<script>
    import { toHex } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
    import { Button } from "bits-ui";

    let sk = "0xSatoshiNakamoto";
    let address = "0xHalFinney";
    let amount = "0";

    $: console.log(sk);

    // async function transfer() {
    //     const pubKey = secp256k1.getPublicKey(sk);
    //     const res = await fetch(`http://localhost:3042/transfer`, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             message: { sender: pubKey, recipient: address, amount: amount },
    //             signature: null,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }

    /**
     * Creates a JSON stringified object
     * {
     *  sender: "0x123...",
     *  recipient: "0x456...".
     *  amount: 99
     * }
     * @param {string} sender - sender address as 0x{hex}
     * @param {string} recipient - recipient address as 0x{hex}
     * @param {string} amount - amount sender will send to recipient
     * @return {string} - stringified version of the transaction message
     */
    function createMessage(sender, recipient, amount) {
        return JSON.stringify({
            sender: `0x${toHex(secp256k1.getPublicKey(String(sender).slice(2)))}`,
            recipient: recipient,
            amount: Number(amount),
        });
    }

    /**
     * Hashes a string message to a hexcode
     * @param {string} msg
     */
    function hashMessage(msg) {
        console.log(toHex(Uint8Array.from(msg)));
        return toHex(Uint8Array.from(msg));
    }

    /**
     * @param {string} msgHash
     * @param {string} sk
     */
    function generateSignature(msgHash, sk) {
        console.log(secp256k1.sign(msgHash, sk.slice(2)));
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
            on:click={generateSignature(
                hashMessage(createMessage(sk, address, amount)),
                sk,
            )}
        >
            Transfer
        </Button.Root>
    </div>
</div>
