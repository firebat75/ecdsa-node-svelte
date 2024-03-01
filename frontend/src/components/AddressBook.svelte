<script>
    import { onMount } from "svelte";
    import { addressBookStore, updateAddressBook } from "$lib/stores";
    import { IconClipboard, IconCurrencyEthereum } from "@tabler/icons-svelte";

    /**
     * @type {{ [s: string]: any; } | ArrayLike<any>}
     */
    let addressBook;

    addressBookStore.subscribe((value) => {
        addressBook = value;
    });

    onMount(async () => {
        updateAddressBook();
    });

    /**
     * @param {string} value
     */
    function clipboard(value) {
        navigator.clipboard.writeText(value);
        console.log(value, "copied to clipboard");
    }
</script>

<div class="grid bg-slate-700 w-96 p-2 m-2 rounded">
    <h1>Address Book</h1>
    <hr />
    <div class="grid grid-cols-2 w-full mt-1">
        <div class="justify-self-start mx-2">Address</div>
        <div class="justify-self-end mx-2">Balance</div>
    </div>
    {#each Object.entries(addressBook) as [address, amount]}
        <div class="inline-flex m-1 bg-slate-600 rounded" id={address}>
            <button
                class="inline-flex bg-purple-900 hover:bg-purple-950 p-1 w-m rounded font-mono items-center justify-center"
                on:click={() => clipboard(address)}
            >
                {address.slice(0, 8)}...
                <IconClipboard size={18} stroke={2} />
            </button>
            <div class="inline-grid w-full">
                <div class="inline-flex p-1 items-center justify-self-end">
                    <div class="mx-1">{amount}</div>
                    <IconCurrencyEthereum size={18} stroke={2} />
                </div>
            </div>
        </div>
    {/each}
</div>
