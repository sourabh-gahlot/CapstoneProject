import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const notify = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const userNameRegex = /\s/;

  const postdata = async () => {
    if (!emailRegex.test(email)) {
      return notify("Invalid email");
    }

    if (userNameRegex.test(username)) {
      notifyB(username + "A userName must not contain any space");
      return;
    }

    const data = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
    };

    const userdata = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resdata = await userdata.json();
    notifyB(resdata.message);
    navigate("/SignIn");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-pink-700 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="">
          <h2>Full Name</h2>
          <input
            type="text"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="mx-auto">
          <h2>User Name</h2>
          <input
            type="text"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="mx-auto">
          <h2>Email</h2>
          <input
            type="email"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mx-auto">
          <h2>Password</h2>
          <input
            type="password"
            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mx-auto">
          <h2>Gender</h2>
          <input
            type="text"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}

            className="border border-blue-500 focus:border-blue-700 rounded-md px-3 py-2 outline-none"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          onClick={() => {
            postdata();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;
