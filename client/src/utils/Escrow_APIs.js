import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "./constants";
import axios from "axios";
import { setWalletMoney } from "./userSlice";

// baseURL/escrow/init

export const init = async (seller, inspector) => {
  const res = await axios.post(`${baseURL}/escrow/init`, {
    seller,
    inspector,
  });
  console.log(res.data);
};

// baseURL/escrow/list

export const listProperty = async (
  nftID,
  purchasePrice,
  escrowAmount,
  seller
) => {
  const res = await axios.post(`${baseURL}/escrow/list`, {
    nftID,
    purchasePrice,
    escrowAmount,
    seller,
  });
  console.log(res.data);
};

// baseURL/escrow/set_buyer

export const setBuyer = async (nftID, buyer, seller) => {
  const res = await axios.post(`${baseURL}/escrow/set_buyer`, {
    nftID,
    buyer,
    seller,
  });
  console.log(res.data);
};

// baseURL/escrow/set_lender

export const setLender = async (buyer, lender) => {
  const res = await axios.post(`${baseURL}/escrow/set_lender`, {
    buyer,
    lender,
  });
  console.log(res.data);
};

// baseURL/escrow/deposit_earnest

export const depositEarnest = async (
  nftID,
  buyer,
  amt,
  loan,
  seller,
  lender,
  inspector
) => {
  const res = await axios.post(`${baseURL}/escrow/deposit_earnest`, {
    nftID,
    buyer,
    amt,
    loan,
    seller,
    lender,
    inspector,
  });
  console.log(res.data);
};

// baseURL/escrow/get_balance_in_contract

export const getContractBalance = async () => {
  const res = await axios.get(`${baseURL}/escrow/get_balance_in_contract`);
  console.log(res.data?.value);
  //setWalletMoney(res.data?.value);
};

// baseURL/escrow/send_amount

export const sendAmount = async (from, amt) => {
  const res = await axios.post(`${baseURL}/escrow/send_amount`, {
    from,
    amt,
  });
  console.log(res.data);

  return res.data;
};

// baseURL/escrow/finalize_sale

export const finalizeSale = async (nftID, from, buyer) => {
  const res = await axios.post(`${baseURL}/escrow/finalize_sale`, {
    nftID,
    from,
    buyer,
  });

  console.log(res.data);

  if (res.data.msg === "property transferred") {
    alert("Property transferred successfully");
  }
};

const Escrow_Helper = () => {
  const user = useSelector((store) => store.user.userData);
  const dispatch = useDispatch();

  init(123, 321);
  listProperty(1, 2, 3, 4);
  setBuyer(10, 20, 30);
  setLender(20, 40);
  depositEarnest(6, 5, 4, 3, 2, 1);
  getContractBalance();
  sendAmount(2, 1);
  finalizeSale(1, 2);

  return <>Escrow Helper</>;
};

export default Escrow_Helper;