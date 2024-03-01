<script>
    import { toHex } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
    import { Button } from "bits-ui";
    import { IconSignLeft } from "@tabler/icons-svelte";

    let sk = "0xSatoshiNakamoto"; // sender's private key
    let address = "0xHalFinney"; // recipient's public key
    let amount = "10"; // amount sender wants to send

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
     * @return {string} stringified version of the transaction message
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
     * @param {string} msg - input msg
     * @return {string} input msg as a hexcode
     */
    function hashMessage(msg) {
        // @ts-ignore
        return toHex(Uint8Array.from(msg));
    }

    /**
     * Generates an SECP256 signature
     * @param {string} msgHash - hex of a message string
     * @param {string} sk - hrivate key as 0x{Hex}
     * @returns {object} an SECP256 signature
     * SECP256 signatures contain 2 bigInts and a recovery number (either 1 or 0)
     * {r: {bigInt}, s: {bigInt}, recovery: {0 or 1}}
     */
    function generateSignature(msgHash, sk) {
        return secp256k1.sign(msgHash, sk.slice(2));
    }

    /**
     * Creates the object that will be the body for the transaction POST request
     * @param {string} senderPrivateKey - sender's private key as 0xHex
     * @param {string} recipientPublicKey - recipient's public key as 0xHex
     * @param {string} amount - amount to send as a string of a nonzero integer
     * @returns {object} an object containing the transaction message and signature
     * Returns:
     * {
     *      message: {
     *              "sender": "0x123...",
     *              "recipient": "0x456...",
     *              "amount": 0
     *              },
     *      signature: {
     *              r: String(bigInt),
     *              s: String(bigInt),
     *              recovery: either 0 or 1
     *              }
     *  }
     */
    function createTransaction(senderPrivateKey, recipientPublicKey, amount) {
        const msg = createMessage(senderPrivateKey, recipientPublicKey, amount);
        const sig = generateSignature(hashMessage(msg), senderPrivateKey);
        const sigStrings = {
            // @ts-ignore
            r: String(sig.r),
            // @ts-ignore
            s: String(sig.s),
            // @ts-ignore
            recovery: sig.recovery,
        };
        return { message: msg, signature: sigStrings };
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
                class="bg-slate-500 rounded p-1 w-[40rem] font-mono px-4"
                bind:value={sk}
            />
        </div>
        <div class="grid m-2">
            <label for="address" class="m-1">Receiving Address:</label>
            <input
                type="text"
                name="address"
                class="bg-slate-500 rounded p-1 w-[40rem] font-mono px-4"
                bind:value={address}
            />
        </div>
        <div class="grid m-2">
            <label for="amount" class="m-1">Amount to send:</label>
            <input
                type="text"
                name="amount"
                class="bg-slate-500 rounded p-1 w-[40rem] font-mono px-4"
                bind:value={amount}
            />
        </div>
    </div>
    <div class="inline-flex items-center justify-center">
        <Button.Root
            class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
  hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
            on:click={createTransaction(sk, address, amount)}
        >
            Sign Transfer
        </Button.Root>
        <Button.Root
            class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
            on:click={createTransaction(sk, address, amount)}
        >
            Send Transfer
        </Button.Root>
    </div>
</div>
