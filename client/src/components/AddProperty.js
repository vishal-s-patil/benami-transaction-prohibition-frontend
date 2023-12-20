import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// id: 29,
//     price: 3800000,
//     emi: 21700,
//     sqft: 550,
//     type: "1bhk",
//     image:
//       "https://assets.nobroker.in/media/building/8a9fac827d47bedb017d47c8f8ef03f3/images/8a9fac827d47bedb017d47c8f8ef03f3_project_image_A1Mwd0PeBo1637643991770_94739_iris_original.jpg",
//     address: "Banashankari, Bangalore",
//     owner_id: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
//     isSale: true,
const AddProperty = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [bedroom, setBedroom] = useState();
  const [bathroom, setBathroom] = useState();
  const [price, setPrice] = useState();
  const [emi, setEmi] = useState(0);
  const [sqft, setSqft] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const propertyList = useSelector((store) => store.property.propertyList);
  const user = useSelector((store) => store.user.userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bathroom <= 0 || bedroom <= 0) {
      alert("Bathrooms and Bed rooms must have a value more than 0");
      return;
    }

    const account_address = user.metamaskId;

    const data = {
      name: name,
      address: address,
      description: description,
      image: "",
      id: "",
      attributes: [
        {
          trait_type: "price",
          value: price,
        },
        {
          trait_type: "type",
          value: type,
        },
        {
          trait_type: "Bed Rooms",
          value: bedroom,
        },
        {
          trait_type: "Bathrooms",
          value: bathroom,
        },
        {
          trait_type: "sqft",
          value: sqft,
        },
        {
          trait_type: "emi",
          value: emi,
        },
      ],
    };

    const form = new FormData();

    form.append("data", JSON.stringify(data));
    form.append("account_address", account_address);
    form.append("file", image);

    console.log(image, typeof image);
    console.log('acc', account_address);
    console.log('user metamsk address', user?.metamaskId);
    console.log('user', user);
    console.log('data', data);

    const res = await axios.post(`${baseURL}/property/add_property`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    });

    console.log(res?.data);

    if (res?.data?.msg === "property added/minted successfully") {
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setImage(e.target.files[0]);
    console.log(image);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="p-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="textarea"
            placeholder="Address"
            className="p-2 pb-12 border rounded w-full mb-2"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price in ETH"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type [1BHK, 2BHK, etc]"
            className="p-2 border rounded w-full mb-2"
            onChange={(e) => setType(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="No. of Bedrooms"
            className="p-2 border rounded w-full mb-2"
            onChange={(e) => setBedroom(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="No. of Bathrooms"
            className="p-2 border rounded w-full mb-2"
            onChange={(e) => setBathroom(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Area in sqft"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setSqft(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 ">
            Upload Property Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full"
            accept=".png, .jpg, .jpeg"
            required
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 text-cyan-50 font-bold py-2 my-4 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
