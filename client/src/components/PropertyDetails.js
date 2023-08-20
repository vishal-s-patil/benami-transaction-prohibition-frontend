import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSaleOfProperty } from "../utils/propertySlice";

const PropertyDetails = () => {
  const id = useParams().id;

  const propertyList = useSelector((store) => store.property.propertyList);

  const property = propertyList?.filter((property) => property.id == id)[0];

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userData);
  const userList = useSelector((store) => store.userList.userList);
  const [userSearchResult, setUserSearchResult] = useState();

  const [showSearchUsers, setSearchUsers] = useState(false);

  const [showBuyOptions, setBuyOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showPaymentButton, setPaymentButton] = useState(false);
  const [amount, setAmount] = useState(0);

  console.log(user);

  const handleSearchLenders = () => {
    const filteredUsers = userList.filter((user) =>
      user?.name?.toLowerCase().includes(searchText?.toLowerCase())
    );
    setUserSearchResult(filteredUsers);
  };

  return (
    <div className="flex p-5 border solid black m-2">
      <img
        src={property.image}
        alt="Property Image"
        className="w-[700px]  h-[600px] pr-4"
      />
      <div className="mt-10">
        <p className="text-2xl font-semibold">Price: ₹{property.price}</p>
        <p className="text-xl py-2">EMI: ₹{property.emi}</p>
        <p className="text-xl py-2">Sqft: {property.sqft} sqft</p>
        <p className="text-xl py-2">Type: {property.type}</p>
        <p className="text-xl py-2">Address: {property.address}</p>
        <p className="text-xl py-2">
          Owner : {property.owner_id.substr(0, 5) + "..."}
        </p>
        <div>
          {user.metamaskId == property.owner_id ? (
            property?.isSale === true ? (
              <>
                <button
                  className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                  onClick={() => dispatch(changeSaleOfProperty(property?.id))}
                >
                  Remove From Sale
                </button>
                <button className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer">
                  Finalize Sale
                </button>
              </>
            ) : (
              <button
                className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                onClick={() => dispatch(changeSaleOfProperty(property?.id))}
              >
                Add To Sale
              </button>
            )
          ) : (
            <>
              <button
                className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                onClick={() => {
                  setBuyOptions(!showBuyOptions);
                }}
              >
                Buy Property
              </button>
              {showBuyOptions && (
                <div className="pt-4">
                  <p
                    className="text-lg font-semibold py-1 cursor-pointer"
                    onClick={() => setPaymentButton(!showPaymentButton)}
                  >
                    Buy with One Time Payment
                  </p>
                  {showPaymentButton && (
                    <button className="ml-2 p-2 border solid bg-slate-500 text-cyan-50">
                      Proceed To Payment
                    </button>
                  )}
                  {/* <p
                    className="text-lg font-semibold py-1 cursor-pointer"
                    onClick={() => setEligibility(!showEligibility)}
                  >
                    Buy using EMI
                  </p>
                  {showEligibility && (
                    <button className="ml-2 p-2 border solid bg-slate-500 text-cyan-50">
                      Check Eligibility
                    </button>
                  )} */}
                  <p
                    onClick={() => {
                      setSearchUsers(!showSearchUsers);
                    }}
                    className="text-lg font-semibold py-1 cursor-pointer"
                  >
                    Borrow Money
                  </p>
                  {showSearchUsers && (
                    <>
                      <div className="flex m-5 pl-10 items-center">
                        <input
                          type="text"
                          placeholder="Search for Lenders here..."
                          className="border solid black pl-3 pr-3 pb-2 pt-2"
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="ml-2 p-2 border solid bg-slate-500 text-cyan-50"
                          value="Search"
                          onClick={handleSearchLenders}
                        >
                          Search
                        </button>
                        <input
                          type="number"
                          placeholder="Enter your loan amount..."
                          className="border solid black pl-3 pr-3 pb-2 pt-2 ml-10"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        {searchText &&
                          userSearchResult?.map((user) => (
                            <div className="flex justify-between items-center px-2 bg-slate-100 my-2">
                              <p className="text-lg pr-4">{user.name}</p>
                              <button className="p-2 border solid bg-slate-500 text-cyan-50">
                                Request For Loan
                              </button>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
