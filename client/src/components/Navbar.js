import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center border solid black">
        <img
          src="data:image/png;base64,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"
          alt="logo"
        ></img>
        <ul className="flex justify-between items-center text-xl">
          <li className="m-10 -mt-2">
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li className="m-10 -mt-2">
            <Link to="/profile">
              <h1>Profile</h1>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
