import { useSelector } from "react-redux";
import { baseURL } from "./constants";
import axios from "axios";

// baseURL/nft/approve

export const approveNFT = async (nftID, seller_address) => {
  const res = await axios.post(`${baseURL}/nft/approve`, {
    nftID,
    current_owner: seller_address,
  });
  console.log(res.data);
};

// baseURL/nft/owner_of

export const ownerOf = async (nftID, caller_address) => {
  const res = await axios.post(`${baseURL}/nft/owner_of`, {
    nftID,
    from: caller_address,
  });
  console.log(res.data);
  return await res;
};

// baseURL/nft/get_all_owners

export const getAllOwners = async (nftID) => {
  const res = await axios.get(`${baseURL}/nft/get_all_owners?tokenId=${nftID}`);
  console.log(res.data);
  return await res.data;
};

// baseURL/nft/get_owned_nfts

export const getOwnedNFTs = async (account_address) => {
  const res = await axios.get(
    `${baseURL}/nft/get_owned_nfts?account_address=${account_address}`
  );
  console.log(res.data);

  return await res;
};

// baseURL/nft/get_ownership_history

export const getOwnershipHistory = async (account_address) => {
  const res = await axios.get(
    `${baseURL}/nft/get_ownership_history?account_address=${account_address}`
  );
  console.log(res.data);
  return await res.data;
};

const NFT_Helper = () => {
  const user = useSelector((store) => store.user.userData);

  //approveNFT(1, 2);
  //ownerOf(1, 2);
  //getAllOwners(18);
  //getOwnedNFTs(123);
  //getOwnershipHistory(99);

  return <>NFT Helper</>;
};

export default NFT_Helper;
