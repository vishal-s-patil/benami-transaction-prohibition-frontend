import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  const [price, setPrice] = useState();
  const [emi, setEmi] = useState();
  const [sqft, setSqft] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();

  const propertyList = useSelector((store) => store.property.propertyList);
  const user = useSelector((store) => store.user.userData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    let n = propertyList.length;
    const id = propertyList[n - 1].id + 1;

    const owner_id = user.metamaskId;
    const isSale = false;

    const newProperty = {
      id,
      price,
      emi,
      sqft,
      type,
      formData,
      address,
      owner_id,
      isSale,
    };

    console.log(newProperty);
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const i = e.target.files[0];

    if (
      i.type === "image/jpeg" ||
      i.type === "image/jpg" ||
      i.type === "image/png"
    ) {
      setImage(e.target.files[0]);
    } else {
      alert("Wrong type of image selected");
    }

    console.log(i);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="p-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="number"
            placeholder="Price in ₹"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="EMI in ₹"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setEmi(e.target.value)}
          />

          <input
            type="number"
            placeholder="Area in sqft"
            className="p-2 border rounded w-full mb-2"
            required
            onChange={(e) => setSqft(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type [1BHK, 2BHK, etc]"
            className="p-2 border rounded w-full mb-2"
            onChange={(e) => setType(e.target.value)}
            required
          />
          <input
            type="textarea"
            placeholder="Address"
            className="p-2 pb-12 border rounded w-full mb-2"
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 ">
            Upload Property Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 text-cyan-50 font-bold py-2 my-4 px-4 rounded"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
