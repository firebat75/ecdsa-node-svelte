const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak.js");

let message = { "sender": "0x03da04af5daa84c919498ebaa0dc30d3d53d36636c5701d1c367103ebe4889fe51", "recipient": "0x2fce7da202eafe2205d3eab13bb2be3253736f89ed032e376e42534e9e7de39bc", "amount": 57 };

let signature = {
    r: '84298255315811064746649490132003955731962330101336967278578734794473171176265',
    s: '16125514621506465250523274691862670435326534271427857438666511069814476122153',
    recovery: 1
};

signature.r = BigInt(signature.r);
signature.s = BigInt(signature.s);
msgBits = Uint8Array.from((JSON.stringify(message)));
pubKey = message.sender.slice(2)
const ver = secp.secp256k1.verify(signature, msgBits, pubKey);
console.log(ver);