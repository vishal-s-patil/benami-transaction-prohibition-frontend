const users = [
  {
    name: "Vishal Police Patil",
    dob: "15-11-2001",
    gender: "M",
    country: "India",
    dist: "Gulbarga",
    pc: "585102",
    po: "Savalgi",
    state: "Karnataka",
    street: "Aland Road",
    subdist: "Afzalpur",
    vtc: "Savalgi (B)",
    metamaskId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  },
  {
    name: "Priya Devi",
    dob: "10-05-1990",
    gender: "F",
    country: "India",
    dist: "Bangalore",
    pc: "560001",
    po: "MG Road",
    state: "Karnataka",
    street: "Brigade Road",
    subdist: "Central Bangalore",
    vtc: "Bangalore (B)",
    metamaskId: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  },
  {
    name: "Rahul Kumar",
    dob: "28-03-1985",
    gender: "M",
    country: "India",
    dist: "Mysore",
    pc: "570001",
    po: "Devaraja Mohalla",
    state: "Karnataka",
    street: "Sayyaji Rao Road",
    subdist: "Central Mysore",
    vtc: "Mysore (B)",
    metamaskId: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  },
  {
    name: "Neha Sharma",
    dob: "22-09-1998",
    gender: "F",
    country: "India",
    dist: "Hubli",
    pc: "580001",
    po: "Navanagar",
    state: "Karnataka",
    street: "Lamington Road",
    subdist: "Central Hubli",
    vtc: "Hubli (B)",
    metamaskId: "0x90F79bf6EB2c4f870365E785982E1f101E93b907",
  },
  {
    name: "Amit Patel",
    dob: "12-07-1983",
    gender: "M",
    country: "India",
    dist: "Belgaum",
    pc: "590001",
    po: "Rani Channamma Nagar",
    state: "Karnataka",
    street: "College Road",
    subdist: "Central Belgaum",
    vtc: "Belgaum (B)",
    metamaskId: "0x90F79bf6EB2c4f870365E785982E1f101E93b908",
  },
  {
    name: "Pooja Verma",
    dob: "03-04-1996",
    gender: "F",
    country: "India",
    dist: "Mangalore",
    pc: "575001",
    po: "Hampankatta",
    state: "Karnataka",
    street: "KS Rao Road",
    subdist: "Central Mangalore",
    vtc: "Mangalore (B)",
    metamaskId: "0x...",
  },
  {
    name: "Rajesh Gupta",
    dob: "18-12-1989",
    gender: "M",
    country: "India",
    dist: "Dharwad",
    pc: "580002",
    po: "Saptapur",
    state: "Karnataka",
    street: "Station Road",
    subdist: "Central Dharwad",
    vtc: "Dharwad (B)",
    metamaskId: "0x...",
  },
  {
    name: "Deepika Singh",
    dob: "09-08-1992",
    gender: "F",
    country: "India",
    dist: "Gadag",
    pc: "582101",
    po: "Gandhinagar",
    state: "Karnataka",
    street: "Station Road",
    subdist: "Central Gadag",
    vtc: "Gadag (B)",
    metamaskId: "0x...",
  },
  {
    name: "Sandeep Kumar",
    dob: "07-06-1994",
    gender: "M",
    country: "India",
    dist: "Bellary",
    pc: "583101",
    po: "Gandhi Nagar",
    state: "Karnataka",
    street: "Gandhi Road",
    subdist: "Central Bellary",
    vtc: "Bellary (B)",
    metamaskId: "0x...",
  },
  {
    name: "Aishwarya S",
    dob: "25-01-1997",
    gender: "F",
    country: "India",
    dist: "Hassan",
    pc: "573201",
    po: "Channarayapatna",
    state: "Karnataka",
    street: "Bengaluru-Mangalore Highway",
    subdist: "Central Hassan",
    vtc: "Hassan (B)",
    metamaskId: "0x...",
  },
];

const user_requests = [
  {
    _id: "6546d5db10b5f581e2378ce9",
    metamaskId: "metamask id2",
    data: [
      {
        requestFrom: "String 22",
        nftId: 22,
        amount: 22,
        _id: "6546d5db10b5f581e2378ceb",
      },
    ],
    __v: 0,
  },
  {
    _id: "6546d5db10b5f581e2378ce6",
    metamaskId: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
    data: [
      {
        requestFrom: "String 11",
        nftId: 11,
        amount: 11,
        _id: "6546d5db10b5f581e2378ce7",
      },
      {
        requestFrom: "String 12",
        nftId: 12,
        amount: 12,
        _id: "6546d5db10b5f581e2378ce8",
      },
    ],
    __v: 0,
  },
];

const loan_repayment = [
  {
    _id: "6546d9c41e668c51f42f7731",
    metamaskId: "String 21",
    data: [
      {
        lender: "metamask id2",
        loan: 21,
        _id: "6546d9c41e668c51f42f7732",
      },
    ],
    __v: 0,
  },
  {
    _id: "6546d9c41e668c51f42f7733",
    metamaskId: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
    data: [
      {
        lender: "metamask id1",
        loan: 12,
        _id: "6546d9c41e668c51f42f7734",
      },
    ],
    __v: 0,
  },
];

const get_user_data = (req, res) => {
  const account_address = req.query.account_address;
  //console.log(account_address);
  if (!account_address) {
    res.status(200).json(users);
  } else {
    for (let index = 0; index < users.length; index++) {
      const user = users[index];

      if (user.metamaskId?.toLowerCase() === account_address?.toLowerCase()) {
        res.status(200).json(user);
      }
    }
    res.send({
      message: "user not found",
    });
  }
};

const upload_xml = (req, res) => {
  //console.log(req);
  console.log(req.body);
  console.log(req.file);
  // console.log(req.params);

  res.send("Uploaded");
};

const get_all_users = (req, res) => {
  res.status(200).json([
    {
      _id: "6546d5db10b5f581e2378ce9",
      metamaskId: "metamask id2",
      data: [
        {
          requestFrom: "String 22",
          nftId: 22,
          amount: 22,
          _id: "6546d5db10b5f581e2378ceb",
        },
      ],
      __v: 0,
    },
    {
      _id: "6546d5db10b5f581e2378ce6",
      metamaskId: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
      data: [
        {
          requestFrom: "String 11",
          nftId: 11,
          amount: 11,
          _id: "6546d5db10b5f581e2378ce7",
        },
        {
          requestFrom: "String 12",
          nftId: 12,
          amount: 12,
          _id: "6546d5db10b5f581e2378ce8",
        },
      ],
      __v: 0,
    },
  ]);
};

const get_user_requests = (req, res) => {
  console.log(req.query.userId);
  const userId = req.query.userId;
  console.log("userId : ", userId);

  if (userId) {
    const temp = user_requests.filter(
      (u) => u.metamaskId.toLowerCase() == userId.toLowerCase()
    );
    console.log(temp[0]?.data);
    res.status(200).json(temp[0]?.data);
  }

  res.status(200).json(user_requests);
};

const remove_user_request = (req, res) => {
  const buyer = req.body.buyer;
  const lender = req.body.lender;

  const new_user_requests = user_requests[lender]?.filter((request) => {
    return request.requestedFrom !== buyer;
  });

  user_requests[lender] = new_user_requests;

  //res.status(200).json(user_requests[lender]);

  res.status(200).json(user_requests["metamaskId of user 1"]);
};

const get_lenders = (req, res) => {
  // This function returns a list of lenders from whom the buyer has taken loan and I have passed buyer address as account address
  // loan_repayment object is similar to user_requests object

  console.log(req.query.account_address);
  const account_address = req.query.account_address;

  console.log("account_address : ", account_address);

  if (account_address) {
    const temp = loan_repayment.filter((u) => {
      return u.metamaskId.toLowerCase() == account_address.toLowerCase();
    });
    console.log(temp);
    res.status(200).json(temp[0]?.data);
  }

  res.status(200).json(loan_repayment);

  //res.status(200).json(loan_repayment["metamaskId of user 1"]);
};

const pay_loan = (req, res) => {
  // This function is responsible for payment of loan by buyer.
  // In body I have passed buyer address, lender address and amount which he has paid now
  // TO DO :: subtract the amount paid now from the loan amount using loan_repayment object and if the
  // loan amount has become zero then remove the lender from the array of the buyer otherwise
  // update the loan amount by subtracting with the money paid now.

  const buyer = req.body.buyer;
  const lender = req.body.lender;
  const amount = req.body.amount;

  console.log(req.body);

  res.status(200).send({ msg: "amount paid successfully" });
};

const add_lenders = (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "Added lenders successfully" });
};

const add_user_requests = (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "Added user request successfully" });
};

module.exports = {
  get_user_data,
  upload_xml,
  get_all_users,
  get_user_requests,
  remove_user_request,
  get_lenders,
  pay_loan,
  add_lenders,
  add_user_requests,
};
