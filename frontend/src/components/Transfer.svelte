<script>
    import { toHex, hexToBytes } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
    import { Button } from "bits-ui";
    import { IconCheck, IconX } from "@tabler/icons-svelte";

    let sk = "0xSatoshiNakamoto"; // sender's private key
    let address = "0xHalFinney"; // recipient's public key
    let amount = "0"; // amount sender wants to send
    let transferBody = {}; // message and signature for transfer

    async function transfer() {
        console.log("sending transfer");
        console.log(JSON.stringify(transferBody));
        // const pubKey = secp256k1.getPublicKey(sk);
        const res = await fetch(`http://localhost:3042/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transferBody),
        })
            .then((response) => console.log(response.json()))
            .then((data) => {
                console.log(data);
            });
    }

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
        console.log({ message: msg, signature: sigStrings });
        validSig = true;
        transferBody = { message: msg, signature: sigStrings };
        return { message: msg, signature: sigStrings };
    }

    let validSK = false;
    let validAddress = false;
    let validAmount = false;
    let validSig = false;

    /**
     * Changes the value of validSK
     * @param {string} sk - private key string
     */
    function checkSK(sk) {
        if (sk.length == 66 && sk.slice(0, 2) == "0x") {
            try {
                hexToBytes(sk.slice(2));
                console.log("valid private key");
                validSK = true;
            } catch (err) {
                validSK = false;
                console.log("invalid private key");
            }
        } else {
            validSK = false;
            console.log("invalid private key");
        }
    }

    /**
     * Changes the value of validAddress
     * @param {string} pk - address string
     */
    function checkAddress(pk) {
        if (pk.length == 67 && pk.slice(0, 2) == "0x") {
            try {
                hexToBytes(`0${pk.slice(2)}`);
                console.log("valid address");
                validAddress = true;
            } catch (err) {
                validAddress = false;
                console.log("invalid address");
            }
        } else {
            validAddress = false;
            console.log("invalid address");
        }
    }

    /**
     * Changes the value of validAmount
     * @param {string} amount - amount value string
     */
    function checkAmount(amount) {
        if (
            // @ts-ignore
            !isNaN(amount) &&
            Number.isInteger(Number(amount)) &&
            Number(amount) > 0
        ) {
            validAmount = true;
            console.log("valid amount");
        } else {
            validAmount = false;
            console.log("invalid amount");
        }
    }

    $: checkSK(sk);
    $: checkAddress(address);
    $: checkAmount(amount);
</script>

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Transfer</h1>
    <hr />
    <div class="p-2">
        <div class="grid m-2">
            <label for="sk" class="m-1">Enter your private key:</label>
            {#if validSK}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-green-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={sk}
                    />
                    <IconCheck size={18} stroke={3} color={"green"} />
                </div>
            {:else}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-red-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={sk}
                    />
                    <IconX size={18} stroke={3} color={"red"} />
                </div>
            {/if}
        </div>
        <div class="grid m-2">
            <label for="address" class="m-1">Receiving Address:</label>
            {#if validAddress}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-green-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={address}
                    />
                    <IconCheck size={18} stroke={3} color={"green"} />
                </div>
            {:else}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-red-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={address}
                    />
                    <IconX size={18} stroke={3} color={"red"} />
                </div>
            {/if}
        </div>
        <div class="grid m-2">
            <label for="amount" class="m-1">Amount to send:</label>
            {#if validAmount}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-green-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={amount}
                    />
                    <IconCheck size={18} stroke={3} color={"green"} />
                </div>
            {:else}
                <div
                    class="inline-flex bg-slate-600 rounded p-1 items-center ring-1 ring-red-600"
                >
                    <input
                        type="text"
                        name="sk"
                        class="bg-slate-600 rounded w-[40rem] font-mono px-4 focus:bg-slate-800"
                        bind:value={amount}
                    />
                    <IconX size={18} stroke={3} color={"red"} />
                </div>
            {/if}
        </div>
    </div>
    <div class="inline-flex items-center justify-center">
        {#if validSK && validAddress && validAmount}
            <Button.Root
                class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
  hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
                on:click={() => createTransaction(sk, address, amount)}
            >
                Sign
            </Button.Root>
        {:else}
            <Button.Root
                class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini bg-blue-300 w-48 h-8 rounded m-4"
            >
                Sign
            </Button.Root>
        {/if}
        {#if validSig}
            <Button.Root
                class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
        hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
                on:click={() => transfer()}
            >
                Send Transfer
            </Button.Root>
        {:else}
            <Button.Root
                class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini bg-blue-300 w-48 h-8 rounded m-4"
            >
                Send Transfer
            </Button.Root>
        {/if}
    </div>
</div>
