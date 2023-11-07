import React, { useState } from "react";
import { useEffect } from "react";
import { getContractBalance } from "../utils/Escrow_APIs";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setWalletMoney } from "../utils/userSlice";
import { getOwnershipHistory } from "../utils/NFT_APIs";

const PrintHelper = (props) => {
  //console.log(tokenId, timestamp, transactionHash);
  //console.log(props);
  const { tokenId, timestamp, transactionHash } = props;
  return (
    <>
      <div className="bg-slate-50 m-4 text-lg font-semibold text-gray-700">
        <p>Token ID : {tokenId}</p>
        <p>Timestamp : {timestamp}</p>
        <p>Transaction Hash : {transactionHash}</p>
      </div>
    </>
  );
};

const Dashboard = () => {
  const getHistory = async (metamaskId) => {
    const res = await getOwnershipHistory(user?.metamaskId);

    if (res?.msg === undefined) {
      setHistoryArray(res);
    }
    console.log('res', res);
    console.log('res.arr', res?.arr);
    console.log('historyArray', historyArray);
  };
  const user = useSelector((store) => store.user.userData);
  //console.log(user?.metamaskId);

  const [historyArray, setHistoryArray] = useState();
  const [lenders, setLenders] = useState();

  const LenderHelper = (props) => {
    const { user, lender, loan } = props;
    console.log(props);

    const [amount, setAmount] = useState();

    const handleLoanPayment = async () => {
      if (!amount) return;

      const res = await axios.post(`${baseURL}/profile/pay_loan`, {
        lender,
        buyer: user?.metamaskId,
        amount,
      });

      console.log(res.data);

      getLenders();
    };

    return (
      <div className="bg-slate-50 m-4 text-lg font-semibold text-gray-700 p-2">
        <p>Lender Address : {lender}</p>
        <p>Loan Amount Remaining : {loan}</p>
        <input
          type="number"
          placeholder="Enter Amount.."
          className="border solid black p-1 px-2  mt-2"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-1 px-2 border solid bg-slate-500 text-cyan-50"
          value="Search"
          onClick={handleLoanPayment}
        >
          Pay Now
        </button>
      </div>
    );
  };

  const getLenders = async () => {
    const res = await axios.get(
      `${baseURL}/profile/get_lenders?account_address=${user?.metamaskId}`
    );
    console.log(res.data);
    setLenders(res.data);
  };

  useEffect(() => {
    getHistory(user?.metamaskId);
    getLenders();
  }, [user]);

  if (!historyArray) return;

  return (
    <>
      {lenders && (
        <div>
          <p className="font-semibold text-xl m-2 my-5">
            Loan Details of {user?.name}
          </p>
          {lenders?.map((e) => (
            //console.log(e.lender + " " + e.loan)
            <LenderHelper lender={e.lender} loan={e.loan} user={user} />
          ))}
        </div>
      )}
      <p className="font-semibold text-xl m-2 my-10">
        History of All Transactions of {user?.name}
      </p>
      <div>
        {historyArray?.map((e) => {
          //console.log(e);
          return (
            <PrintHelper
              tokenId={e.tokenId}
              transactionHash={e.transactionHash}
              timestamp={e.timestamp}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
