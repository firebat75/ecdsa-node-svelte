const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("private key:", toHex(privateKey));

console.log(Object.getOwnPropertyNames(secp.secp256k1.utils));