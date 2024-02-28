<script>
    import { onMount } from "svelte";
    import { addressBookStore, updateAddressBook } from "$lib/stores";

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
</script>

<div class="grid bg-slate-700 w-m p-2 m-2 rounded">
    <h1>All Addresses</h1>
    <hr />
    {#each Object.entries(addressBook) as [address, amount]}
        <div class="inline-flex m-1 bg-slate-600 rounded">
            <div class="bg-purple-900 from-blue-600 p-1 rounded">{address}</div>
            <div class="p-1">{amount}</div>
        </div>
    {/each}
</div>
