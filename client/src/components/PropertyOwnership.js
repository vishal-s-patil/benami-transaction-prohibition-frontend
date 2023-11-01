import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOwners } from "../utils/NFT_APIs";

const PropertyOwnership = () => {
  const nft_id = useParams().id;
  const [allOwners, setAllOwners] = useState();

  const getOwners = async () => {
    const data = await getAllOwners(nft_id);
    setAllOwners(data.msg);
    console.log(allOwners);
  };

  useEffect(() => {
    getOwners();
  }, [allOwners]);

  return (
    <div>
      <p className="font-semibold text-xl m-2 my-5">History of Ownership</p>
      {allOwners}
    </div>
  );
};

export default PropertyOwnership;
