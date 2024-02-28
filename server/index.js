const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "0x4": 500,
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

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});


app.post("/create/:address", (req, res) => {
  const { address } = req.params;
  console.log("creating", address);
  balances[address] = 1000;
  res.send(balances);
});

// app.get("/create", (req, res) => {
//   // const { address } = req.params;
//   // console.log("creating address", address);
//   res.send(1000);
//   // balances.push({ address: 1000 });
//   // res.status(200).send({ message: `address ${address} created successfully` })
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
