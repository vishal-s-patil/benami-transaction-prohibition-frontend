import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { baseURL, propertyLi } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPropertyList } from "../utils/propertySlice";
import { setUserList } from "../utils/userListSlice";

const PropertyList = () => {
  const dispatch = useDispatch();

  const [metamaskId, setMetamaskId] = useState();

  const [propertyList, setPL] = useState();
  const [filteredList, setFilteredList] = useState();
  const [searchText, setSearchText] = useState();
  const [propertyType, setPropertyType] = useState();
  const [price, setPrice] = useState();

  const handleGetPropertyList = async () => {
    const data = await axios.get(`${baseURL}/property`);
    console.log(data?.data);

    const tempList = data?.data?.filter(
      (property) => property?.isSale === true
    );

    setFilteredList(tempList);
    setPL(tempList);

    if (data?.data) dispatch(setPropertyList(data?.data));

    const users = await axios.get(`${baseURL}/profile/get_all_users`);
    //console.log(users.data);

    if (users?.data) dispatch(setUserList(users?.data));
  };

  const connectToMetamask = async () => {
    console.log("Requesting account...");
    // X Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setMetamaskId(accounts[0]);
        console.log(accounts);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const handleSearch = () => {
    const tempList = filteredList.filter((property) =>
      property?.address?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(tempList);
  };

  const handleFilter = () => {
    let tempList = propertyList;
    if (price !== undefined) {
      tempList = propertyList?.filter((property) => property?.price <= price);
    }

    if (propertyType !== undefined) {
      tempList = tempList?.filter(
        (property) => property?.type.toLowerCase() == propertyType.toLowerCase()
      );
    }

    setFilteredList(tempList);
  };

  useEffect(() => {
    handleGetPropertyList();
    console.log(propertyList);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex m-5 pl-10 items-center">
          <input
            type="text"
            placeholder="Search for property here..."
            className="border solid black pl-3 pr-3 pb-3 pt-3"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50"
            value="Search"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center">
          <label className="border solid 1px black p-3 mr-2">
            Property Type:
            {/* <select value={propertyType} onChange={handlePropertyTypeChange}> */}
            <select
              className="border solid 1px bg-slate-500 text-cyan-50 p-1 pl-2 pr-2 ml-2"
              value={propertyType}
              onChange={(e) => {
                setPropertyType(e.target.value);
                //return handlePropertyTypeChange();
              }}
            >
              <option value="">All</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              {/* Add more options for other property types */}
            </select>
          </label>
          <br />
          <label className="border solid 1px black p-3">
            Max Price:
            <input
              type="number"
              className="border solid 1px  p-1 pl-2 pr-2 ml-2"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
          <button
            className="ml-2 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </div>
        <div className="ml-2 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50">
          <button
            onClick={() => {
              setFilteredList(propertyList);
            }}
          >
            Show All
          </button>
        </div>
        <div className="ml-2 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50">
          <button
            onClick={() => {
              connectToMetamask();
            }}
          >
            {metamaskId === undefined
              ? "Connect"
              : metamaskId.substr(0, 5) + "..."}
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-wrap m-5 border solid 2px black">
        {filteredList &&
          filteredList.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </div>
    </>
  );
};

export default PropertyList;
