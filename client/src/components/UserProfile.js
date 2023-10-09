import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  //   follow user

  const followUser = (userId) => {
    fetch("http://localhost:8080/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      })
      .catch((err) => console.log(err));
  };

  const unfollowUser = (userId) => {
    fetch("http://localhost:8080/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      })
      .catch((error) => console.log(error));
  }, [isFollow]);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
            alt="profile-pic"
          />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space",
            }}
          >
            <h1 className="nameInProfile">{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>

          <div className="profile-info" style={{ display: "flex" }}>
            <p> {posts.length} posts </p>
            <p> {user.followers ? user.followers.length : 0} Followers </p>
            <p> {user.following ? user.following.length : 0} Following </p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />
      <div className="gallery">
        {posts.map((pics) => {
          return (
            <img
              alt="sample"
              key={pics._id}
              src={pics.photo}
              className="item"
            />
          );
        })}
      </div>
    </div>
  );
}
