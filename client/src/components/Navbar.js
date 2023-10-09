import React, { useContext } from "react";
import LoginContext from "../utils/LoginContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token || login) {
      return (
        <>
          <div className="flex  items-center  ">
            <input type="text" className="border border-gray-300 rounded px-4 py-2  pr-24 mr-96 "/>
            <ul className="flex ">
              <li className="mr-2 text-2xl">&#127968;</li>
              <li className="mr-2 text-2xl">&#x2709;</li>
              <li className="mr-2 text-2xl">&#128276;</li>
              <button
              className=""
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex " >
          <Link to="/SignUp" className="px-10">
            <li>Sign Up</li>
          </Link>
          <Link to="/SignIn">
            <li>Sign In</li>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-between p-10 bg-red-300">
      <h1>MERNY</h1>
      <div className="">
        <h1 className="">{loginStatus()}</h1>
      </div>
    </div>
  );
};

export default Navbar;
