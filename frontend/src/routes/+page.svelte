<script>
    import Balances from "../components/Balances.svelte";
    import BitsTest from "../components/BitsTest.svelte";
    import CreateWallet from "../components/CreateWallet.svelte";
    import { Button } from "bits-ui";
</script>

<div class="p-4">
    <h1 class="m-2">ECDSA Node</h1>

    <Balances />

    <CreateWallet />
</div>
