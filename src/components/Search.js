import React, { useEffect, useState } from "react";

const Search = () => {
  const [metamaskId, setMetamaskId] = useState();

  useEffect(() => {}, [metamaskId]);

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

  return (
    <div className="flex justify-between items-center">
      <div className="flex m-5 pl-10 items-center">
        <input
          type="text"
          placeholder="Search for property here..."
          className="border solid black pl-3 pr-3 pb-2 pt-2"
        />
        <button
          type="submit"
          className="ml-2 p-2 border solid bg-slate-500 text-cyan-50"
          value="Search"
        >
          Search
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
  );
};

export default Search;
