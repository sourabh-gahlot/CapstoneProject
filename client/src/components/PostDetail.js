import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostDetails({ item, toggleDetails }) {
  
  const notifyB = (msg) => toast.success(msg);
  const navigate = useNavigate();
  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete the post")) {
      fetch(`http://localhost:8080/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          notifyB("Post Deleted!");
          console.log(result);
          toggleDetails();
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="comments" />
        </div>
        <div className="details">
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <div className="card-pic">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
                alt="avatar"
              />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div className="deletePost" onClick={() => removePost(item._id)}>
              <span class="material-symbols-outlined">delete</span>
            </div>
          </div>
          {/* comment section */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                  <span className="commentText">{comment.comment}</span>
                </p>
              );
            })}
          </div>
          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add a comment"
              //   value={comment}
              //   onChange={(e) => {
              //     setComment(e.target.value);
              //   }}
            />
            <button
              className="comment"
              //   onClick={() => {
              //     makeComment(comment, item._id);
              //     toggleComment();
              //   }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="close-comment">
        <span
          className="material-symbols-outlined material-symbols-outlined-comment"
          onClick={() => toggleDetails()}
        >
          close
        </span>
      </div>
    </div>
  );
}
