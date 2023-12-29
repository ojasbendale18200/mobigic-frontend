import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
        <div>
          <Link to={"/signin"}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4">
              Sign In
            </button>
          </Link>
          <Link to={"/"}>
            {" "}
            <button className="bg-green-500 text-white py-2 px-4 rounded-md">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
