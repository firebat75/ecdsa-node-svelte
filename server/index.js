const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x39ee95db9f2b0cbdc6ee3bc52ce98d45b013e955c9fd1494c0c375de5c7614c31": 1000,
  "0x3c603db14c7f39e15e8222aeffbce4d1e5a70495bca7b53d50f98638037679488": 1000,
  "0x24722ff8b70fb87bc266f202d410d3e4a2d64d6223123ed93c591fe8699d73204": 1000,
  "0x365ba35f369923b76d1de5860135f0bf3b6de02779c1168d7d166e690d06521f9": 1000,
};

app.get("/balances", (req, res) => {
  res.send(balances);
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log("getting balance", address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

var secp = require("ethereum-cryptography/secp256k1");

app.post("/transfer", (req, res) => {
  const { message, signature } = req.body;
  signature.r = BigInt(signature.r);
  signature.s = BigInt(signature.s);
  msgBits = Uint8Array.from((message));
  msgParse = JSON.parse(message);
  pubKey = `0${msgParse.sender.slice(2)}`;
  const ver = secp.secp256k1.verify(signature, msgBits, pubKey);

  console.log(ver);
  console.log(balances);
  console.log(msgParse.sender);
  console.log(balances[msgParse.sender]);
  console.log(msgParse.recipient);
  console.log(balances[msgParse.recipient]);
  console.log(msgParse.amount);

  if (ver && balances[msgParse.sender] >= msgParse.amount) {
    balances[msgParse.sender] -= msgParse.amount;
    balances[msgParse.recipient] += msgParse.amount;
    res.status(200).send(`transferred ${msgParse.amount} from ${msgParse.sender} to ${msgParse.recipient}`);
  } else {
    res.status(400).send("error in transferring");
  }
});


app.post("/create/:address", (req, res) => {
  const { address } = req.params;
  console.log("creating", address);
  balances[address.toString()] = 1000;
  res.send(balances);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

