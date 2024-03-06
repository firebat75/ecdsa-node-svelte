const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
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
  pubKey = msgParse.sender.slice(2)
  const ver = secp.secp256k1.verify(signature, msgBits, pubKey);
  console.log(ver);


  res.status(200).send({ message: "received" });

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

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
