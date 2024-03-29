const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak.js");

const addressBook = { "0x34536319f36168938e672060fd4ed9ab59b83f3699c21e77049691300e84d4533": 1000, "0x2c663be68f7b3e45fcb20edf86c43fd8ead0053aca9a77f6b02dc20d19140e989": 1000, "0x2bed40bd694c155a08ec837e820db7361f5c038d994bfc94d695642b6b9daf76c": 1000, "0x36b514db236aef716c879c08ee31ced9b31b95f45ddee387b5d506ffd179929db": 1000 }

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const shex = toHex(privateKey);
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const phex = toHex(publicKey);

console.log("private key:", privateKey);
console.log("private key hex:", toHex(privateKey));
const skString = String(toHex(privateKey));
console.log(typeof skString);

console.log("public key:", publicKey);
console.log("public key hex:", toHex(publicKey));
const pkString = String(toHex(publicKey));
console.log(typeof pkString);
const redo = hexToBytes(pkString);
console.log(redo);

const pub1 = Object.keys(addressBook)[3];
const sec1 = "eb0aca57dab135eae5a49a0affc1d7c34ae05317b9133e39e39568cecb481799";
console.log("pub1:", pub1);
console.log(`${pub1.slice(0)}`);
const pub1Bytes = hexToBytes(`0${pub1.slice(2)}`);
const sec1Bytes = hexToBytes(sec1);
console.log("pub1Bytes:", pub1Bytes);
console.log("sec1Bytes:", sec1Bytes);


const msgUint = Uint8Array.from("{recipient:joe biden, amount: 66}");
console.log(msgUint);

const sig = secp.secp256k1.sign(msgUint, sec1Bytes);
console.log(sig);

const ver = secp.secp256k1.verify(sig, msgUint, pub1Bytes);
console.log(ver);


console.log("public key:", pub1);
console.log("private key:", sec1);
const msg = "Tranfer 10000 to Joe Biden";
const msgHex = toHex(Uint8Array.from(msg))
console.log("msgHash as hex:", msgHex);
const sig2 = secp.secp256k1.sign(msgHex, sec1);
console.log(sig2);
const ver2 = secp.secp256k1.verify(sig2, msgHex, `0${pub1.slice(2)}`);
console.log(ver2);

let m = { "sender": "0x03da04af5daa84c919498ebaa0dc30d3d53d36636c5701d1c367103ebe4889fe51", "recipient": "0x2fce7da202eafe2205d3eab13bb2be3253736f89ed032e376e42534e9e7de39bc", "amount": 57 };

let x = {
    r: '84298255315811064746649490132003955731962330101336967278578734794473171176265',
    s: '16125514621506465250523274691862670435326534271427857438666511069814476122153',
    recovery: 1
};

console.log(m.sender);