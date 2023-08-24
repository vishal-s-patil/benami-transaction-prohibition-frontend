import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";
import PropertyCard from "./PropertyCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [metamaskId, setMetamaskId] = useState();
  const [allowUpload, setAllowUpload] = useState(false);
  const currentUser = useSelector((store) => store.user.userData);
  const dispatch = useDispatch();
  const propertyList = useSelector((store) => store.property.propertyList);
  const [selectedFile, setSelectedFile] = useState();

  const [selectedDate, setSelectedDate] = useState();

  const [name, setName] = useState();
  const [dob, setdob] = useState();
  const [gender, setGender] = useState();
  const [country, setCountry] = useState();
  const [dist, setDist] = useState();
  const [pc, setpc] = useState();
  const [po, setpo] = useState();
  const [state, setState] = useState();
  const [street, setStreet] = useState();
  const [subdist, setSubdist] = useState();
  const [vtc, setVtc] = useState();
  const [pass, setPass] = useState();

  let userDetails = {
    name: "",
    dob: "",
    gender: "",
    country: "",
    dist: "",
    pc: "",
    po: "",
    state: "",
    street: "",
    subdist: "",
    vtc: "",
    metamaskId: "",
  };

  useEffect(() => {
    connectToMetamask();
  }, [metamaskId]);

  const setUserData = (user_details) => {
    dispatch(setUser(user_details));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      name,
      dob,
      gender,
      country,
      dist,
      pc,
      po,
      state,
      street,
      subdist,
      vtc,
      metamaskId,
    };

    try {
      const { data } = await axios.post(`${baseURL}/profile/upload`, {
        userDetails,
        metamaskId,
      });

      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    if (pass < 0 || pass > 9999) {
      console.log("Invalid pass, it should be 4 digit only");
      alert("Invalid Pass");
      return;
    }

    const formData = new FormData();
    console.log(selectedFile);

    formData.append("file", selectedFile); // Use the 'file' key here

    const file = formData;
    const account_address = metamaskId;

    // console.log("Form Data ", file);
    // console.log(account_address);
    // console.log(pass);

    try {
      await axios.post(`${baseURL}/profile/upload`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        pass,
        account_address,
      });
      alert("File uploaded successfully");
    } catch (error) {
      alert("An error occurred while uploading the file");
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    //console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const getUserData = async () => {
    const data = await axios.post(`${baseURL}/profile/get_user_data`, {
      metamaskId,
    });

    console.log(data?.data?.user_details);

    if (data?.data?.user_details === undefined) {
      setAllowUpload(true);
    } else {
      setAllowUpload(false);
      setUserData(data?.data?.user_details);
    }
  };

  const connectToMetamask = async () => {
    //console.log("Requesting account...");
    // X Check if Meta Mask Extension exists
    if (window.ethereum) {
      //console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setMetamaskId(accounts[0]);
        //console.log(accounts);
        console.log(metamaskId);
        getUserData();
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        {allowUpload ? (
          <div className="p-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Other fields */}
              {/* ... other user details */}
              <input
                type="text"
                placeholder="Name"
                className="p-2 border rounded w-full mb-2"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Date"
                className="p-2 border rounded w-full mb-2"
                required
                onChange={(e) => setdob(e.target.value)}
              />

              <input
                type="text"
                placeholder="Gender [F/M]"
                className="p-2 border rounded w-full mb-2"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="PO"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setpo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Street"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="District"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setDist(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Sub District"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setSubdist(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Pincode"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setpc(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="State"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="VTC"
                className="p-2 border rounded w-full mb-2"
                onChange={(e) => setVtc(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
            <p className="pl-3 pt-4 text-xl font-semibold"> OR </p>

            {/* File upload */}
            <div className="mb-4 mt-4">
              <form onSubmit={handleFileSubmit}>
                <label className="block text-sm font-medium text-gray-700 ">
                  Upload XML File
                </label>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="mt-1 p-2 border rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Pass for file"
                  className="p-2 border rounded w-full mb-2"
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
              </form>
            </div>
            {/* Submit button */}
          </div>
        ) : (
          <div>
            <div className="flex">
              <div className="border black solid w-3/4 p-5 pl-10 flex flex-col center items-start">
                <h1 className="text-2xl font-semibold p-1 pb-3">
                  {currentUser?.name}
                </h1>
                <p className="p-1">{currentUser?.dob}</p>
                <p className="p-1">{currentUser?.gender}</p>
                <p className="p-1">{currentUser?.country}</p>
                <p className="p-1">{currentUser?.po}</p>
                <p className="p-1">{currentUser?.street}</p>
                <p className="p-1">{currentUser?.subdist}</p>
                <p className="p-1">{currentUser?.dist}</p>
                <p className="p-1">{currentUser?.pc}</p>
                <p className="p-1">{currentUser?.vtc}</p>
                <p className="p-1">{currentUser?.state}</p>
              </div>
              <div className="m-2 p-2">
                <Link to="/add-property">
                  <button
                    type="submit"
                    className="ml-2 p-2 px-3 border solid bg-slate-500 text-cyan-50"
                    value="Search"
                    // onClick={handleSearchLenders}
                  >
                    Add New Property
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Properties Owned</h2>
              <ul className="mt-4 space-y-2 pl-10 pb-2 flex flex-wrap justify-between">
                {propertyList?.map((property) => {
                  console.log(property.owner_id);
                  if (
                    property?.owner_id?.toLowerCase() ==
                    currentUser?.metamaskId?.toLowerCase()
                  ) {
                    return <PropertyCard property={property} />;
                  }
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
