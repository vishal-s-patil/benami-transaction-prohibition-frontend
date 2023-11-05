const oldPropertyList = [
  {
    _id: 2,
    nft_id: 3,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 6700000,
    emi: 38400,
    sqft: 684,
    addr: "Near DSR Diseria, Gunjur village, Bangalore",
    type: "1bhk",
    image:
      "https://images.nobroker.in/images/8a9fb6827e7bd179017e7bf504620f34/8a9fb6827e7bd179017e7bf504620f34_65142_861180_medium.jpg",

    status: true,
    bed_rooms: 2,
    bath_rooms: 3,
    metadata:
      "https://gateway.pinata.cloud/ipfs/QmSCgBBCjon2SAbvXpqGLhmGci7EnKbf21R3sywzaxEcmE",
    _v: 0,
  },
  {
    id: 3,
    price: 5200000,
    emi: 29800,
    sqft: 570,
    type: "2bhk",
    image:
      "https://images.nobroker.in/images/8a9fdf84899f6d330189a072ce5c2a05/8a9fdf84899f6d330189a072ce5c2a05_27718_medium.jpg",
    address: "Rajaji Nagar, Bangalore",
    owner_id: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    isSale: true,
  },
  {
    id: 5,
    price: 9500000,
    emi: 54200,
    sqft: 1000,
    type: "3bhk",
    image:
      "https://images.nobroker.in/images/8a9f927a7329c72f01732e55d3902594/8a9f927a7329c72f01732e55d3902594_67658_77021_medium.jpg",
    address: "Bannerghatta Road, Bangalore",
    owner_id: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    isSale: true,
  },
  {
    id: 7,
    price: 3500000,
    emi: 20000,
    sqft: 450,
    type: "1bhk",
    image:
      "https://images.nobroker.in/images/8a9f927a7329c72f01732e55d3902594/8a9f927a7329c72f01732e55d3902594_56412_343505_large.jpg",
    address: "Electronic City Phase 1, Bangalore",
    owner_id: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    isSale: true,
  },
  {
    id: 11,
    price: 7800000,
    emi: 44500,
    sqft: 800,
    type: "2bhk",
    image:
      "https://assets.nobroker.in/media/building/8a9f8f8379b8e0fe0179b95505c14695/images/8a9f8f8379b8e0fe0179b95505c14695_project_image_OhxPPF85bS1635602104517_82990_iris_original.jpg",
    address: "Marathahalli, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
  {
    id: 13,
    price: 4200000,
    emi: 24000,
    sqft: 600,
    type: "1bhk",
    image:
      "https://images.nobroker.in/images/8a9f927a7329c72f01732e55d3902594/8a9f927a7329c72f01732e55d3902594_18345_153807_large.jpg",
    address: "Whitefield, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
  {
    id: 17,
    price: 6200000,
    emi: 35500,
    sqft: 750,
    type: "2bhk",
    image:
      "https://images.nobroker.in/images/8a9f927a7329c72f01732e55d3902594/8a9f927a7329c72f01732e55d3902594_313_762565_medium.jpg",
    address: "JP Nagar, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
  {
    id: 19,
    price: 10500000,
    emi: 60000,
    sqft: 1200,
    type: "3bhk",
    image:
      "https://assets.nobroker.in/media/building/8a9f8f8379b8e0fe0179b95505c14695/images/8a9f8f8379b8e0fe0179b95505c14695_others_ga9d5Yz0pB1675754324675_21296_iris_original.jpg",
    address: "HSR Layout, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
  {
    id: 23,
    price: 5800000,
    emi: 33200,
    sqft: 700,
    type: "2bhk",
    image:
      "https://assets.nobroker.in/media/building/8a9fae827c5eb723017c5ee4d33b2977/images/8a9fae827c5eb723017c5ee4d33b2977_project_image_8TlRfMXDcF1681467563400_65477_iris_original.jpg",
    address: "Koramangala, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
  {
    id: 29,
    price: 3800000,
    emi: 21700,
    sqft: 550,
    type: "1bhk",
    image:
      "https://assets.nobroker.in/media/building/8a9fac827d47bedb017d47c8f8ef03f3/images/8a9fac827d47bedb017d47c8f8ef03f3_project_image_A1Mwd0PeBo1637643991770_94739_iris_original.jpg",
    address: "Banashankari, Bangalore",
    owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    isSale: true,
  },
];

let propertyList = [
  {
    _id: 2,
    nft_id: 3,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 6700000,
    emi: 38400,
    sqft: 684,
    addr: "Near DSR Diseria, Gunjur village, Bangalore",
    type: "1bhk",
    image:
      "https://images.nobroker.in/images/8a9fb6827e7bd179017e7bf504620f34/8a9fb6827e7bd179017e7bf504620f34_65142_861180_medium.jpg",

    status: "transaction",
    bed_rooms: 2,
    bath_rooms: 3,
    metadata:
      "https://gateway.pinata.cloud/ipfs/QmSCgBBCjon2SAbvXpqGLhmGci7EnKbf21R3sywzaxEcmE",
    _v: 0,
  },
  {
    _id: 3,
    nft_id: 4,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 8200000,
    emi: 45000,
    sqft: 900,
    addr: "123 Main Street, Anytown, USA",
    type: "2bhk",
    image: "https://example.com/image3.jpg",
    status: "onSale",
    bed_rooms: 2,
    bath_rooms: 2,
    metadata: "https://example.com/metadata3.json",
    _v: 0,
  },
  {
    _id: 4,
    nft_id: 5,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 5500000,
    emi: 32000,
    sqft: 750,
    addr: "456 Elm Avenue, Anothercity, USA",
    type: "1bhk",
    image: "https://example.com/image4.jpg",
    status: "onSale",
    bed_rooms: 1,
    bath_rooms: 1,
    metadata: "https://example.com/metadata4.json",
    _v: 0,
  },
  {
    _id: 5,
    nft_id: 6,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 12500000,
    emi: 65000,
    sqft: 1100,
    addr: "789 Oak Lane, Yetanothercity, USA",
    type: "3bhk",
    image: "https://example.com/image5.jpg",
    status: "onSale",
    bed_rooms: 3,
    bath_rooms: 2,
    metadata: "https://example.com/metadata5.json",
    _v: 0,
  },
  {
    _id: 6,
    nft_id: 7,
    owner: "0x1bA7eD9c69367c4Dc22fAd15e6c9a5B30ab69D59",
    price: 9500000,
    emi: 55000,
    sqft: 800,
    addr: "321 Cedar Road, Yetanothercity, USA",
    type: "2bhk",
    image: "https://example.com/image6.jpg",
    status: "transaction",
    bed_rooms: 2,
    bath_rooms: 1,
    metadata: "https://example.com/metadata6.json",
    _v: 0,
  },
  {
    _id: 7,
    nft_id: 8,
    owner: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    price: 7200000,
    emi: 42000,
    sqft: 900,
    addr: "567 Pine Drive, Anothercity, USA",
    type: "2bhk",
    image: "https://example.com/image7.jpg",
    status: "onSale",
    bed_rooms: 2,
    bath_rooms: 2,
    metadata: "https://example.com/metadata7.json",
    _v: 0,
  },
  {
    _id: 8,
    nft_id: 9,
    owner: "0x3c9f4dE1A27F5c41aE9C7F860C3A5c48E6F3F885",
    price: 6700000,
    emi: 38000,
    sqft: 700,
    addr: "101 Willow Street, Yetanothercity, USA",
    type: "1bhk",
    image: "https://example.com/image8.jpg",
    status: "onSale",
    bed_rooms: 1,
    bath_rooms: 1,
    metadata: "https://example.com/metadata8.json",
    _v: 0,
  },
  {
    _id: 9,
    nft_id: 10,
    owner: "0x5D2B2a53DfDb88eF7218561b455Cf7D8E123A1e7",
    price: 10200000,
    emi: 59000,
    sqft: 950,
    addr: "246 Birch Lane, Anothercity, USA",
    type: "3bhk",
    image: "https://example.com/image9.jpg",
    status: "onSale",
    bed_rooms: 3,
    bath_rooms: 2,
    metadata: "https://example.com/metadata9.json",
    _v: 0,
  },
  {
    _id: 10,
    nft_id: 11,
    owner: "0x7f3ACe09fCC4ABd0c4Dd8918e38aBF72FbdE162d",
    price: 8800000,
    emi: 50000,
    sqft: 850,
    addr: "789 Spruce Avenue, Yetanothercity, USA",
    type: "2bhk",
    image: "https://example.com/image10.jpg",
    status: "onSale",
    bed_rooms: 2,
    bath_rooms: 1,
    metadata: "https://example.com/metadata10.json",
    _v: 0,
  },
  {
    _id: 11,
    nft_id: 12,
    owner: "0x1BdC37aFC8AfdA4B2A87d75fD65712A9C4689FAB",
    price: 7600000,
    emi: 44000,
    sqft: 720,
    addr: "432 Oak Avenue, Anothercity, USA",
    type: "2bhk",
    image: "https://example.com/image11.jpg",
    status: "onSale",
    bed_rooms: 2,
    bath_rooms: 2,
    metadata: "https://example.com/metadata11.json",
    _v: 0,
  },
  {
    _id: 12,
    nft_id: 13,
    owner: "0x2b4C76D8b1A0Ea793a596C68348b6E91f84Db72A",
    price: 9200000,
    emi: 52000,
    sqft: 880,
    addr: "123 Elm Street, Yetanothercity, USA",
    type: "2bhk",
    image: "https://example.com/image12.jpg",
    status: "onSale",
    bed_rooms: 2,
    bath_rooms: 2,
    metadata: "https://example.com/metadata12.json",
    _v: 0,
  },
];

const getProperties = async (req, res) => {
  res.status(200).json(propertyList);
};

const addProperty = async (req, res) => {
  console.log(req.form);
  console.log(req.body);

  res.send({ msg: "property added/minted successfully", txn: "mint_response" });
};

const changeStatus = async (req, res) => {
  const id = req.body.id;
  console.log(id);

  const index = propertyList.findIndex((property) => property?._id == id);
  propertyList = propertyList.map((property) => {
    if (property?._id == id) {
      return { ...property, status: req.body.status };
    }
    return property;
  });

  res.status(200).send({ msg: "Status update successful" });
};

module.exports = {
  getProperties,
  addProperty,
  changeStatus,
};
