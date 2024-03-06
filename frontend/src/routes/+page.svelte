<script>
    import AddressBook from "../components/AddressBook.svelte";
    import CreateWallet from "../components/CreateWallet.svelte";
    import Transfer from "../components/Transfer.svelte";
</script>

<div class="p-4">
    <h1 class="m-2">ECDSA Node</h1>

    <div class="flex justify-center w-full">
        <div class="w-min">
            <CreateWallet />

            <Transfer />
        </div>

        <div class="w-min">
            <AddressBook />
        </div>
    </div>
</div>
