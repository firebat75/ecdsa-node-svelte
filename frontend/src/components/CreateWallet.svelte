<script>
    import { updateAddressBook } from "$lib/stores";
    import { Button } from "bits-ui";

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
</script>

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Create Wallet</h1>
    <hr />
    <div>
        <div class=" m-1 p-1">
            Your public key is
            <div
                class="inline-flex m-1 bg-slate-600 p-1 rounded font-mono w-[40rem] px-4"
            >
                0x{String(toHex(publicKey)).slice(1)}
            </div>
            Your private key is
            <div
                class="inline-flex m-1 bg-slate-600 p-1 rounded font-mono ring-1 ring-red-700 w-[40rem] px-4"
            >
                0x{toHex(secretKey)}
            </div>
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
