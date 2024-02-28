<script>
    import Balances from "../components/Balances.svelte";
    import BitsTest from "../components/BitsTest.svelte";
    import { Button } from "bits-ui";
</script>

<div class="p-4">
    <h1>ECDSA Node</h1>

    <Balances />

    <BitsTest />

    <Button.Root class="h-12 w-80 bg-blue-500 hover:bg-blue-600 rounded">
        Click me
    </Button.Root>
</div>
