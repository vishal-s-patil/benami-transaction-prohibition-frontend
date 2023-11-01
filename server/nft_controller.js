const approve = (req, res) => {
  console.log(req.body);
  res.send({ msg: "approved" });
};

const ownerOf = (req, res) => {
  console.log(req.body);
  res.send({ owner: "address of owner" });
};

const getAllOwners = (req, res) => {
  console.log(req.query.tokenId);
  res.send({ msg: "all owners array" });
};

const getOwnedNFTs = (req, res) => {
  console.log(req.query.account_address);
  res.send({ msg: "array of nft ids" });
};

const getOwnershipHistory = (req, res) => {
  console.log(req.query.account_address);
  res.send({
    arr: [
      {
        tokenId: "1",
        timestamp: 1698007585,
        transactionHash:
          "0x26ab1fa9263295d8c716386a6669b09d9e1111f1a8a596d844b98e9e4c3a3914",
      },
      {
        tokenId: "2",
        timestamp: 1698007560,
        transactionHash:
          "0x26ab1fa9263295d8c716386a6669b09d9e1111f1a8a596d844b98e9e4c3a7290",
      },
    ],
  });
};

module.exports = {
  approve,
  ownerOf,
  getAllOwners,
  getOwnedNFTs,
  getOwnershipHistory,
};
