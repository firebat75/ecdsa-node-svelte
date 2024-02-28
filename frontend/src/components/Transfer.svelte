<script>
    import { toHex } from "ethereum-cryptography/utils";
    import { secp256k1 } from "ethereum-cryptography/secp256k1";
</script>

<div class="grid bg-slate-700 w-min p-2 m-2 rounded">
    <h1>Transfer</h1>
    <hr />
    <div class="p-2">
        <div class="grid m-2">
            <label for="sk" class="m-1">Enter your private key:</label>
            <input
                type="text"
                name="sk"
                class="bg-slate-500 rounded p-1 w-[40rem]"
            />
        </div>
        <div class="grid m-2">
            <label for="address" class="m-1">Receiving Address:</label>
            <input
                type="text"
                name="address"
                class="bg-slate-500 rounded p-1 w-[40rem]"
            />
        </div>
        <div class="grid m-2">
            <label for="amount" class="m-1">Amount to send:</label>
            <input
                type="text"
                name="amount"
                class="bg-slate-500 rounded p-1 w-[40rem]"
            />
        </div>
    </div>
</div>
