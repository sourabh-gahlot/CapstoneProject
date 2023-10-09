import { useState } from "react";
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = async () => {
    // Create a data object with the user's information
    const data = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      gender: gender,
    };

    // Send a POST request to the /signup endpoint
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    console.log(jsonData);
  };

  return (
    <div>
      <div>
        <h1 className="text-xl">Fullname</h1>
        <input type="text" onChange={(e) => setFullname(e.target.value)} />
        <h2>Username</h2>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <h3>Email</h3>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <h3>Password</h3>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <h3>Gender</h3>
        <input type="text" onChange={(e) => setGender(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
