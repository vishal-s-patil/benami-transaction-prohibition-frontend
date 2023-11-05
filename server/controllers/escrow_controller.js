const init = (req, res) => {
  console.log(req.body);
  res.send({ msg: "initialized successfully" });
};

const listProperty = (req, res) => {
  console.log(req.body);
  res.send({ msg: "listed successfully" });
};

const setBuyer = (req, res) => {
  console.log(req.body);
  res.send({ msg: "buyer set" });
};

const setLender = (req, res) => {
  console.log(req.body);
  res.send({ msg: "lender set" });
};

const depositEarnest = (req, res) => {
  console.log(req.body);
  res.send({ msg: "deposit done" });
};

const getContractBalance = (req, res) => {
  console.log(req.body);
  res.send({ msg: "amount of money", value: 6700000 });
};
const sendAmount = (req, res) => {
  console.log(req.body);
  res.send({ msg: "amount sent" });
};

const finalizeSale = (req, res) => {
  console.log(req.body);
  res.send({ msg: "property transferred" });
};

module.exports = {
  init,
  listProperty,
  setBuyer,
  setLender,
  depositEarnest,
  getContractBalance,
  sendAmount,
  finalizeSale,
};
