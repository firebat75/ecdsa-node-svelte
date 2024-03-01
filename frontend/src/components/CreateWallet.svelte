<script>
    import { updateAddressBook } from "$lib/stores";
    import { Button } from "bits-ui";
    import { IconClipboard } from "@tabler/icons-svelte";

    import { toHex } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let secretKey = secp256k1.utils.randomPrivateKey();
    let publicKey = secp256k1.getPublicKey(secretKey);

    function createNewWallet() {
        secretKey = secp256k1.utils.randomPrivateKey();
        publicKey = secp256k1.getPublicKey(secretKey);

        console.log("creating wallet...");
        console.log("private key:", toHex(secretKey));
        console.log("public key:", toHex(publicKey));

        addToAddressBook();
        dispatch("walletCreated", { secretKey, publicKey });
        updateAddressBook();
    }

    async function addToAddressBook() {
        const res = await fetch(
            `http://localhost:3042/create/0x${String(
                toHex(publicKey).slice(1),
            ).toString()}`,
            {
                method: "POST",
            },
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("address added");
            });
    }

    /**
     * Adds value to clipboard
     * @param {string} value - hex of a message string\
     */
    function clipboard(value) {
        navigator.clipboard.writeText(value);
        console.log(value, "copied to clipboard");
    }
</script>

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Create Wallet</h1>
    <hr />
    <div>
        <div class=" m-1 p-1">
            Your public key is
            <button
                class="inline-flex m-1 bg-slate-600 rounded w-[40rem] justify-center p-1 items-center hover:bg-slate-500"
                on:click={() => clipboard(`0x${toHex(publicKey).slice(1)}`)}
            >
                <div class="font-mono">
                    0x{toHex(publicKey).slice(1)}
                </div>
                <div class="w-min rounded ml-2">
                    <IconClipboard size={18} stroke={2} class="" />
                </div>
            </button>
            Your private key is
            <button
                class="inline-flex m-1 bg-slate-600 rounded w-[40rem] justify-center p-1 items-center hover:bg-slate-500"
                on:click={() => clipboard(`0x${toHex(secretKey)}`)}
            >
                <div class="font-mono">
                    0x{toHex(secretKey)}
                </div>
                <div class="w-min rounded ml-2">
                    <IconClipboard size={18} stroke={2} class="" />
                </div>
            </button>
        </div>
    </div>
    <div class="inline-flex items-center justify-center">
        <Button.Root
            class="inline-flex items-center justify-center rounded-input font-semibold text-background shadow-mini
  hover:bg-blue-700 bg-blue-600 w-48 h-8 rounded m-4"
            on:click={createNewWallet}
        >
            Generate New Wallet
        </Button.Root>
    </div>
</div>
