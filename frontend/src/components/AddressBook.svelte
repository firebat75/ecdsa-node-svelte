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

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Address Book</h1>
    <hr />
    {#each Object.entries(addressBook) as [address, amount]}
        <div class="inline-flex m-1 bg-slate-600 rounded" id={address}>
            <div
                class="inline-flex bg-purple-900 hover:bg-purple-950 p-1 w-m rounded font-mono"
                on:click={clipboard(address.toString())}
            >
                {address.toString().slice(0, 8)}...
                <IconClipboard />
            </div>
            <div class="inline-flex p-1 items-center justify-center">
                <div class="mx-1">{amount}</div>
                <IconCurrencyEthereum size={18} stroke={2} />
            </div>
        </div>
    {/each}
</div>
