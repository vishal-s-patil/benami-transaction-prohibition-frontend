import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import { useSelector } from "react-redux";
import { sendAmount } from "../utils/Escrow_APIs";
import { getOwnedNFTs, ownerOf } from "../utils/NFT_APIs";

const SingleRequest = ({
  user,
  buyer,
  nftId,
  amount,
  requests,
  setRequests,
}) => {
  const [propertyOwner, setPropertyOwner] = useState();
  const [nftArray, setNftArray] = useState();
  const [showBuyerNft, setShowBuyerNft] = useState(false);
  const [showPropertyOwner, setShowPropertyOwner] = useState(false);

  const getBuyerNFTs = async () => {
    const res = await getOwnedNFTs(buyer);
    console.log(res?.data);

    setNftArray(res?.data?.msg);
  };

  const getOwnerOfProperty = async () => {
    const res = await ownerOf(nftId, user?.metamaskId);
    console.log(res?.data);

    setPropertyOwner(res?.data?.owner);
  };

  useEffect(() => {
    getBuyerNFTs();
    getOwnerOfProperty();
  }, []);

  const handleIgnoreRequest = async () => {
    const res = await axios.post(`${baseURL}/profile/remove_user_request`, {
      buyer,
      lender: user?.metamaskId,
    });

    console.log(res.data);
    setRequests(res.data);
  };
  const handleAcceptRequest = async () => {
    const res = await sendAmount(user?.metamaskId, amount);
    console.log(res);

    if (res?.msg === "amount sent") {
      const req = await axios.post(`${baseURL}/profile/remove_user_request`, {
        buyer,
        lender: user?.metamaskId,
      });

      console.log(req.data);
      setRequests(req.data);
    }
  };
  return (
    <>
      <div className=" p-4 bg-slate-100 my-2">
        <p
          className="text-lg py-2 pr-8 "
          onClick={() => setShowBuyerNft(!showBuyerNft)}
        >
          <b>Account Id : </b>
          {buyer}
          {showBuyerNft && (
            <div className="ml-3 text-lg font-semibold mt-2">
              <p className="font-semibold">List of NFTs owned by buyer : </p>
              {/* {nftArray?.map((id) => (
                <p className="ml-4">id</p>
              ))} */}
            </div>
          )}
        </p>
        <p
          className="text-lg py-2 pr-8 "
          onClick={() => setShowPropertyOwner(!showPropertyOwner)}
        >
          {" "}
          <b>Property Id : </b> {nftId}
          {showPropertyOwner && (
            <div className="ml-3 text-lg mt-2 flex">
              <p className="font-semibold mr-2">Property Owner : </p>
              <p>{propertyOwner}</p>
            </div>
          )}
        </p>
        <p className="text-lg py-2 pr-8 ">
          <b>Amount Requested for Loan : </b>₹{amount}
        </p>
        <div>
          <button
            className="p-2 mr-2 border solid bg-slate-500 text-cyan-50 font-semibold"
            onClick={handleAcceptRequest}
          >
            Accept
          </button>
          <button
            className="p-2 border solid bg-cyan-50 text-slate-700 font-semibold"
            onClick={handleIgnoreRequest}
          >
            Ignore
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

const Requests = () => {
  const user = useSelector((store) => store.user.userData);
  const [requests, setRequests] = useState();
  const getRequests = async () => {
    console.log(user.metamaskId);
    const res = await axios.get(
      `${baseURL}/profile/get_user_requests?userId=${user?.metamaskId}`
    );
    console.log(res.data);
    setRequests(res.data);
  };

  useEffect(() => {
    getRequests();
  }, [user]);

  return (
    <div>
      <p className="font-semibold text-xl m-2 my-5">
        Requests You Received For Loan
      </p>
      {requests &&
        requests?.map((request) => (
          <SingleRequest
            user={user}
            buyer={request.requestFrom}
            nftId={request.nftId}
            amount={request.amount}
            requests={requests}
            setRequests={setRequests}
          />
        ))}
    </div>
  );
};

export default Requests;
