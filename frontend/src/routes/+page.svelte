<script>
    import AddressBook from "../components/AddressBook.svelte";
    import CreateWallet from "../components/CreateWallet.svelte";
    import Transfer from "../components/Transfer.svelte";
</script>

<div class="grid justify-center p-4">
    <div class="m-2 h-min w-min bg-slate-700 rounded justify-self-center">
        <h1 class="m-2 text-center">ECDSA Node</h1>
    </div>

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
