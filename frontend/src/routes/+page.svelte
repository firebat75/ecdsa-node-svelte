<script>
    import AddressBook from "../components/AddressBook.svelte";
    import BitsTest from "../components/BitsTest.svelte";
    import CreateWallet from "../components/CreateWallet.svelte";
    import Transfer from "../components/Transfer.svelte";
    import { Button } from "bits-ui";
</script>

<div class="p-4">
    <h1 class="m-2">ECDSA Node</h1>

    <AddressBook />

    <CreateWallet />

    <Transfer />
</div>
