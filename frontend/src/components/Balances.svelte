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

{#each Object.entries(wallets) as [address, amount]}
    <p>{address}: {amount}</p>
{/each}
