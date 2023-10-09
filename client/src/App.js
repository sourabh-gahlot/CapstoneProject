//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContext from "./utils/LoginContext";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useState } from "react";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./components/FollowingPost";
import Profile from "./components/Profile";
import Createpost from "./components/CreatePost";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <div>
          <LoginContext.Provider value={{ setIsLogin }}>
            <Navbar login={isLogin} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/SignIn" element={<SignIn />}></Route>
              <Route exact path="/Profile" element={<Profile />}></Route>
              <Route path="/createPost" element={<Createpost />}></Route>
              <Route path="/profile/:userid" element={<UserProfile />}></Route>
              <Route
                path="/myfollowingpost"
                element={<MyFollowingPost />}
              ></Route>
            </Routes>
          </LoginContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
