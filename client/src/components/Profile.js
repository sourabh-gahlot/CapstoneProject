import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetail";
// import ProfilePic from "./ProfilePic";

export default function Profile() {
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);

  //function to show/No-show PostDetails
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/myPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        console.log(pic);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            onClick={changeProfile()}
            src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
            alt="profile pic"
          />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1 className="nameInProfile">
            {JSON.parse(localStorage.getItem("user")).name}
          </h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p> {pic.length} posts </p>
            <p> 40 followers </p>
            <p> 40 following </p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              onClick={() => toggleDetails(pics)}
            />
          );
        })}
      </div>
      {show && <PostDetails item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic/>}
    </div>
  );
}
