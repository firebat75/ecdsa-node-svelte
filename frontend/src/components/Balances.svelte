<script>
    import { onMount } from "svelte";
    let wallets = {};

    function getBalances() {
        fetch("http://localhost:3042/balances")
            .then((response) => response.json())
            .then((data) => {
                wallets = data;
                for (const [key, value] of Object.entries(wallets)) {
                    console.log(`${key}: ${value}`);
                }
            });
    }

    onMount(async () => {
        getBalances();
    });
</script>

<div class="grid bg-slate-700 w-96 p-1 rounded">
    <h1>All Addresses</h1>
    <hr />
    {#each Object.entries(wallets) as [address, amount]}
        <div class="inline-flex m-1 bg-slate-600 rounded">
            <div class="bg-purple-900 from-blue-600 p-1 rounded">{address}</div>
            <div class="p-1">{amount}</div>
        </div>
    {/each}
</div>
