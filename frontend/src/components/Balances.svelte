<script>
    let wallets = {};
    fetch("http://localhost:3042/balances")
        .then((response) => response.json())
        .then((data) => {
            wallets = data;
            for (const [key, value] of Object.entries(wallets)) {
                console.log(`${key}: ${value}`);
            }
        });
</script>

<div class="grid bg-slate-300 w-96 p-1 m-1 rounded">
    {#each Object.entries(wallets) as [address, amount]}
        <div class="inline-flex">
            <div class="bg-cyan-200 p-1 rounded">{address}</div>
            <div class="p-1">{amount}</div>
        </div>
    {/each}
</div>
