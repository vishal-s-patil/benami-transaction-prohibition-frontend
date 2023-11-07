import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllOwners,
  getOwnedNFTs,
  getOwnershipHistory,
  ownerOf,
} from "../utils/NFT_APIs";

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

const ArrayPrinter = (props) => {
  const { arr } = props;

  //if (typeof arr[0] !== "number") return;

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

const Check = () => {
  //   return (
  //     <>
  //       <div className="flex items-between">
  //         <div className="bg-slate-200 shadow-md">Left Section</div>
  //         <div>Right Section</div>
  //       </div>
  //     </>
  //   );
  const [searchText, setSearchText] = useState();
  const [selectedOption, setSelectedOption] = useState(
    "Find Current Owner Of any NFT"
  );
  const options = [
    "Find Current Owner Of any NFT",
    "See Ownership History of any NFT",
    "Check all NFTs owned",
    "Check User's NFT history",
  ];

  const [res1, setRes1] = useState();
  const [res2, setRes2] = useState();
  const [res3, setRes3] = useState();
  const [res4, setRes4] = useState();

  const user = useSelector((store) => store.user.userData);

  const handleOption1 = async () => {
    if (searchText === undefined) return;

    const res = await ownerOf(searchText, user?.metamaskId);
    console.log(res.data);
    setRes1(res.data?.owner);
    setSearchText();
  };

  const handleOption2 = async () => {
    if (searchText === undefined) return;

    const res = await getAllOwners(searchText);
    console.log(res);
    if (res?.msg === undefined) {
      setRes2(res);
    }
    setSearchText();
  };

  const handleOption3 = async () => {
    if (searchText === undefined) return;

    const res = await getOwnedNFTs(searchText);
    console.log(res.data);
    if (res.data?.msg === undefined) {
      setRes3(res.data);
    }

    setSearchText();
  };

  const handleOption4 = async () => {
    if (searchText === undefined) return;

    const res = await getOwnershipHistory(searchText);
    console.log(res);
    if(res?.msg === undefined){
      setRes4(res?.arr);
    }
    
    setSearchText();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-1/4 bg-slate-200 p-4">
        <h2 className="text-2xl font-semibold mb-2">Select an option:</h2>
        <ul className="mt-4">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer ${
                selectedOption === option ? "text-cyan-500" : "text-gray-600"
              } text-xl font-semibold m-3`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-3/4 bg-white p-4">
        <h2 className="text-xl font-semibold mb-4">{selectedOption}</h2>
        <div>
          {selectedOption === "Find Current Owner Of any NFT" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter NFT Id of Property"
                  className="border solid black pl-3 pb-3 pt-3 pr-6"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 p-3 border solid bg-slate-500 text-cyan-50"
                  value="Search"
                  onClick={handleOption1}
                >
                  Submit
                </button>
              </div>
              <div className="mt-4">
                {res1 && (
                  <p className="text-lg">
                    <b>Owner of NFT : </b>
                    {res1}
                  </p>
                )}
              </div>
            </>
          )}
          {selectedOption === "See Ownership History of any NFT" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter NFT Id of Property"
                  className="border solid black pl-3 pb-3 pt-3 pr-6"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 p-3 border solid bg-slate-500 text-cyan-50"
                  value="Search"
                  onClick={handleOption2}
                >
                  Submit
                </button>
              </div>
              <div>
                {res2 && (
                  <div className="mt-4">
                    <p className="text-lg ">
                      <b>Owners : </b>
                    </p>
                    {res2?.length ? (
                      <ArrayPrinter arr={res2} />
                    ) : (
                      <ul>
                        <li>None</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {selectedOption === "Check all NFTs owned" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter User Account Address"
                  className="border solid black pl-3 pb-3 pt-3 pr-6"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 p-3 border solid bg-slate-500 text-cyan-50"
                  value="Search"
                  onClick={handleOption3}
                >
                  Submit
                </button>
              </div>
              <div>
                {res3 && (
                  <div className="mt-4">
                    <p className="text-lg">
                      <b>NFT's owned : </b>
                    </p>
                    {res3?.length ? (
                      <ArrayPrinter arr={res3} />
                    ) : (
                      <ul>
                        <li>None</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {selectedOption === "Check User's NFT history" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter User Account Address"
                  className="border solid black pl-3 pb-3 pt-3 pr-6"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 p-3 border solid bg-slate-500 text-cyan-50"
                  value="Search"
                  onClick={handleOption4}
                >
                  Submit
                </button>
              </div>
              <div>
                {res4 && (
                  <div className="mt-4">
                    <p className="text-lg">
                      <b>NFT's owned : </b>
                    </p>
                    {res4?.map((e) => {
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
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Check;
