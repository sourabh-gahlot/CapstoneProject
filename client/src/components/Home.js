import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  console.log(token);
  if (!token) {
    navigate("/SignUp");
  }

  const [postText, setPostText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const handlePost = async () => {
    const postdata = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showModal),
    });
    const postobj = await postdata.json();
    console.log(postobj);
  };

  const likePost = (id) => {
    fetch("http://localhost:8080/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            result.postedBy = posts.postedBy;
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  const unlikePost = (id) => {
    fetch("http://localhost:8080/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            result.postedBy = posts.postedBy;
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  // function to make comment
  const makeComment = (text, id) => {
    fetch("http://localhost:8080/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        // notifyB("Comment Posted");
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  //function to show/No show comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="what are you thinking"
          onChange={(e) => {
            setPostText(e.target.value);
          }}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Post
        </button>
      </div>

      {/* Modal for posting */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md">
            <textarea
              placeholder="Write your post here..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            {/* Add options for uploading photos and quotes */}
            <button
              onClick={handlePost}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
            >
              Post
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

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
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="comment"
              onClick={() => {
                makeComment(comment, item._id);
                toggleComment();
              }}
            >
              Post
            </button>
          </div>
          <div className="close-comment">
            <span
              className="material-symbols-outlined material-symbols-outlined-comment"
              onClick={() => toggleComment()}
            >
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
