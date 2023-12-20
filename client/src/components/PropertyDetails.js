import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSaleOfProperty, setPropertyList } from "../utils/propertySlice";
import axios from "axios";
import Web3 from 'web3';
import { baseURL } from "../utils/constants";
import {
  depositEarnest,
  finalizeSale,
  init,
  listProperty,
  sendAmount,
  setBuyer,
  setLender,
} from "../utils/Escrow_APIs";
import { approveNFT } from "../utils/NFT_APIs";

const web3 = new Web3();
const weiToEther = (weiAmount) => {
  return web3.utils.fromWei(weiAmount, 'ether');
}

const PropertyDetails = () => {
  const id = useParams().id;
  const propertyList = useSelector((store) => store.property.propertyList);

  const prop = propertyList?.filter((prop) => {
    return prop?._id == id;
  });

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userData);
  const userList = useSelector((store) => store.userList.userList);
  const [userSearchResult, setUserSearchResult] = useState();

  const [showSearchUsers, setSearchUsers] = useState(false);

  const [showBuyOptions, setBuyOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showPaymentButton, setPaymentButton] = useState(false);
  const [amount, setAmount] = useState(0);
  const [property, setProperty] = useState(prop[0]);
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);

  const navigate = useNavigate();

  //console.log(user?.metamaskId + " " + property?.owner);

  const [inspector, setInspector] = useState();

  const connectToMetamask = async () => {
    console.log("Requesting account...");
    // X Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        let n = accounts.length;
        console.log('all accounts', accounts);
        console.log('inspector account', accounts[n - 1]);
        setInspector(accounts[n - 1]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  useEffect(() => {
    connectToMetamask();
  }, []);

  const getProperties = async () => {
    const { data } = await axios.get(`${baseURL}/property/get_properties`);
    //console.log(data);
    dispatch(setPropertyList(data));
  };

  const handleSearchLenders = () => {
    console.log("userlist", userList);
    const filteredUsers = userList?.filter(
      (u) =>
        u?.account_address?.toLowerCase().includes(searchText?.toLowerCase()) &&
        u?.account_address != user?.metamaskId
    );
    console.log("filteredUsers", filteredUsers);
    setUserSearchResult(filteredUsers);
    //console.log(filteredUsers);
  };

  const handleAddPropertySubmit = async (e) => {
    e.preventDefault();
    ///console.log(propertyPrice + " " + depositAmount);
    if (propertyPrice <= 0 || depositAmount <= 0) {
      alert("Property Price and Deposit Amount should be more than 0");
      return;
    }

    // let x = depositAmount;
    // setPropertyPrice(propertyPrice);
    // setDepositAmount(x);

    console.log("deposit amount in add to sale", depositAmount, propertyPrice);
    // if (depositAmount >= propertyPrice) {
    //   alert("Deposit Amount should be less than Property Price");
    //   return;
    // }

    // Changing sale status of property to onSale, notOnSale or transaction in backend and redux store
    dispatch(changeSaleOfProperty({ id: property?.nft_id, status: "onSale" }));

    // Approve NFT before initialisation and listing property
    await approveNFT(property?.nft_id, property?.owner);

    //  initialising using seller account and inspector account which is a dummy account

    connectToMetamask();

    console.log('inspector', inspector);

    await init(property?.owner, inspector);

    // listing the property for sale
    await listProperty(
      property?.nft_id,
      propertyPrice,
      depositAmount,
      property?.owner
    );

    // Fetching all properties again
    await getProperties();

    // Changing current selected property status since searching for it again in propertyList will take time
    setProperty({ ...property, status: "onSale" });
  };

  const handleFullPayment = async () => {
    if (!user || !user.metamaskId) {
      console.log("user in handle full payment", user);
      console.log("buyer", user?.metamaskId);
      return;
    }

    await setBuyer(property?.nft_id, user?.metamaskId, property?.owner);

    await setLender(user?.metamaskId, property?.owner);

    // Here I am sending the entire property price itself since it is full payment and lender address is seller address itself
    await depositEarnest(
      property?.nft_id,
      user?.metamaskId,
      property?.price,
      0,
      property?.owner,
      property?.owner,
      inspector
    );

    // Seller address itself and 0 amount since buyer has fully paid the amount
    await sendAmount(property?.owner, 0);

    // Changing sale status of property to onSale, notOnSale or transaction in backend and redux store
    dispatch(
      changeSaleOfProperty({
        id: property?.nft_id,
        status: `transaction ${user?.metamaskId}`,
      })
    );

    // Fetching all properties again
    await getProperties();

    // Changing current selected property status since searching for it again in propertyList will take time
    setProperty({ ...property, status: `transaction ${user?.metamaskId}` });
  };

  const handleDepositAndLoan = async (lenderAddress) => {
    console.log("lender address in handleDepositAndLoan", lenderAddress);
    if (lenderAddress === undefined) return;

    if (amount < property?.emi) {
      alert("Need to pay atleast the deposit amount");
      return;
    }

    await setBuyer(property?.nft_id, user?.metamaskId, property?.owner);
    //console.log(lenderAddress);
    await setLender(user?.metamaskId, lenderAddress);
    console.log("amount in handle fullpament", amount);

    const remainingAmount = property?.price - amount;
    await depositEarnest(
      property?.nft_id,
      user?.metamaskId,
      amount,
      remainingAmount,
      property?.owner,
      lenderAddress,
      inspector
    );

    const res = await axios.post(`${baseURL}/profile/add_lenders`, {
      buyer: user?.metamaskId,
      lender: lenderAddress,
      amount: remainingAmount,
    });

    console.log("add lender resposne", res.data);

    const r = await axios.post(`${baseURL}/profile/add_user_request`, {
      requestFrom: user?.metamaskId,
      requestTo: lenderAddress,
      nftId: property?.nft_id,
      amount: remainingAmount,
    });

    console.log("add user req resposen", r.data);

    // Changing sale status of property to onSale, notOnSale or transaction in backend and redux store
    dispatch(
      changeSaleOfProperty({
        id: property?.nft_id,
        status: `transaction ${user?.metamaskId}`,
      })
    );

    // Fetching all properties again
    await getProperties();

    // Changing current selected property status since searching for it again in propertyList will take time
    setProperty({ ...property, status: `transaction ${user?.metamaskId}` });
  };

  const handleFinalizeSale = async () => {
    const res = await axios.get(`${baseURL}/escrow/get_balance_in_contract`);
    const value = weiToEther(res.data?.value);
    // console.log(value);
    if (value >= property?.price) {
      await finalizeSale(
        property?.nft_id,
        property?.owner,
        property?.status.substr(12)
      );

      // Changing sale status of property to onSale, notOnSale or transaction in backend and redux store
      dispatch(
        changeSaleOfProperty({ id: property?.nft_id, status: "notOnSale" })
      );

      // Fetching all properties again
      await getProperties();

      // Changing current selected property status since searching for it again in propertyList will take time
      setProperty({ ...property, status: "notOnSale" });

      navigate("/");
    } else {
      alert(`Property payment isn't complete, payment sent is: ${value} / ${property?.price}`, );
      return;
    }
  };

  return (
    <div className="flex p-5 border solid black m-2">
      <img
        src={property?.image}
        alt="Property Image"
        className="w-[700px]  h-[600px] pr-4"
      />
      <div className="mt-10">
      <p className="text-xl py-2">NFT ID : {property?.nft_id}</p>
        <p className="text-2xl font-semibold">Price: {property?.price} ETH</p>
        <p className="text-xl py-2">Deposit Amount: {property?.emi} ETH</p>
        <p className="text-xl py-2">Sqft: {property?.sqft} sqft</p>
        <p className="text-xl py-2">Type: {property?.type}</p>
        <p className="text-xl py-2">Address: {property?.addr}</p>
        <p className="text-xl py-2">
          Owner : {property?.owner?.substr(0, 5) + "..."}
        </p>
        <Link to={"/property/ownership/" + property?.nft_id}>
          <p className="text-xl py-2 text-blue-600 hover:text-blue-500">
            View Ownership History
          </p>
        </Link>
        <div>
          {user?.metamaskId.toLowerCase() === property?.owner.toLowerCase() ? (
            property?.status === "onSale" ? (
              <>
                <button
                  className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                  onClick={() => {
                    // Changing sale status of property to onSale, notOnSale or transaction in backend and redux store
                    dispatch(
                      changeSaleOfProperty({
                        id: property?.nft_id,
                        status: "notOnSale",
                      })
                    );

                    // Fetching all properties again
                    getProperties();

                    // Changing current selected property status since searching for it again in propertyList will take time
                    setProperty({ ...property, status: "notOnSale" });
                    navigate("/");
                  }}
                >
                  Remove From Sale
                </button>
              </>
            ) : property?.status.substr(0, 11) === "transaction" &&
              (user?.metamaskId === property?.owner ||
                property?.status.substr(12).toLowerCase() ===
                  user?.metamaskId.toLowerCase()) ? (
              <button
                className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                onClick={handleFinalizeSale}
              >
                Finalize Sale
              </button>
            ) : (
              <form onSubmit={handleAddPropertySubmit}>
                <div className="flex flex-col justify-between mt-5">
                  <input
                    type="number"
                    placeholder="Enter price of property"
                    className="border solid black pl-3 pr-3 pb-2 pt-2 m-2"
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Enter deposit amount for property"
                    className="border solid black pl-3 pr-3 pb-2 pt-2 m-2 -mt-1"
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="mt-3 p-2 mr-10 ml-2 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
                  onClick={() => {}}
                >
                  Add To Sale
                </button>
              </form>
            )
          ) : property?.status.substr(0, 11) === `transaction` ? (
            <button
              className="mt-5 p-2 mr-10 border solid text-lg bg-slate-500 text-cyan-50 cursor-pointer"
              onClick={handleFinalizeSale}
            >
              Finalize sale
            </button>
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
                    <button
                      className="ml-2 p-3 border solid bg-slate-500 text-cyan-50 font-semibold text-lg"
                      onClick={handleFullPayment}
                    >
                      Pay {property?.price} ETH
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
                    Pay Deposit and Borrow Money
                  </p>
                  {showSearchUsers && (
                    <>
                      <input
                        className="border mx-2 mt-2 solid black pl-3 pr-3 pb-3 pt-3"
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        placeholder="Enter amount.."
                      />
                      <div className="flex m-2 pt-4 items-center">
                        <input
                          type="text"
                          placeholder="Search for Lenders here..."
                          className="border solid black pl-3 pr-3 pb-3 pt-3"
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="ml-2 p-3 border solid bg-slate-500 text-cyan-50"
                          value="Search"
                          onClick={handleSearchLenders}
                        >
                          Search
                        </button>
                        <label className="ml-2 p-2 border solid bg-slate-700 text-cyan-50 font-semibold">
                          Loan Amount : {property?.price - amount} ETH
                        </label>
                      </div>
                      <div>
                        {searchText &&
                          userSearchResult?.map((u) => (
                            <div className="flex justify-between items-center px-2 bg-slate-100 my-2">
                              <p className="text-lg py-4 pr-8 ">
                                {u?.account_address}
                              </p>
                              <button
                                className="p-2 border solid bg-slate-500 text-cyan-50 font-semibold"
                                //className="p-3 ml-2 mt-1 border solid bg-slate-500 text-cyan-50 font-semibold text-lg"
                                onClick={async () => {
                                  console.log(u.account_address);

                                  handleDepositAndLoan(u.account_address);
                                }}
                              >
                                Pay {amount} ETH and Request For Loan
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
