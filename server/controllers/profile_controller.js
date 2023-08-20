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

const get_user_data = (req, res) => {
  console.log(req.body);
  console.log(req.body.metamaskId);
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    console.log(
      user.metamaskId?.toLowerCase() + " " + req.body.metamaskId?.toLowerCase()
    );
    if (user.metamaskId?.toLowerCase() == req.body.metamaskId?.toLowerCase()) {
      res.send({
        user_details: user,
      });
      return;
    }
  }
  res.send({
    message: "user not found",
  });
};

const upload_xml = (req, res) => {
  //console.log(req);
  console.log(req.body);
  console.log(req.files);
  // console.log(req.params);

  res.send("Uploaded");
};

const get_all_users = (req, res) => {
  res.status(200).json(users);
};

module.exports = {
  get_user_data,
  upload_xml,
  get_all_users,
};
