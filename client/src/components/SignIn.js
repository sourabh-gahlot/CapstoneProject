import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginContext from "../utils/LoginContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const { setIsLogin, user } = useContext(LoginContext);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postdata = async () => {
    if (!emailRegex.test(email)) {
      return notify("Invalid email");
    }

    const data = {
      email: email,
      password: password,
    };

    const userdata = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const userdataObj = await userdata.json();
    console.log(userdataObj);
    notifyB(userdataObj.msg);
    localStorage.setItem("jwt", userdataObj.access_token);
    localStorage.setItem("fullname", userdataObj.user.fullname);
    localStorage.setItem("avatar", userdataObj.user.avatar);
    localStorage.setItem("username", userdataObj.username);
    setIsLogin(true);
    navigate("/");
  };
  return (
    <div className="flex justify-center pt-20 bg-pink-700 h-screen">
      <div className="bg-white p-8 mb-36 rounded-lg shadow-md">
        <div className="mb-4">
          <h2>Email address</h2>
          <input
            type="email"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <h2>Password</h2>
          <input
            type="password"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={(e) => {
            postdata();
          }}
        >
          LOGIN
        </button>

        <div className="">
          Don't have an account?
          <Link to="/SignUp" className="bg-blue-500 hover:bg-blue-600 text-white ml-2 px-4 py-2 mt-2 rounded">
            <span> Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
