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

  const ArrayPrinter = (props) => {
    const { arr } = props;

    if (typeof arr[0] !== "number") return;

    return (
      <>
        {arr && (
          <ol className="bg-slate-50 m-4 text-lg font-semibold text-gray-700">
            {arr?.map((id) => {
              return <li>Token ID : {id}</li>;
            })}
          </ol>
        )}
      </>
    );
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
