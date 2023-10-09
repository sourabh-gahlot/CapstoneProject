import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const notify = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:8080/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notify(data.error);
          } else {
            notifyB("Successfully posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "merny-social");
    data.append("cloud_name", "cloudofneeraj");
    fetch("https://api.cloudinary.com/v1_1/cloudofneeraj/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));

    //saving post to databse
  };

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          {" "}
          Share{" "}
        </button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAY1BMVEX///8AAADp6enBwcHl5eUTExMfHx86Ojr5+fns7OzNzc3y8vKLi4siIiL29vZ1dXXHx8c/Pz+FhYWZmZmRkZHY2NikpKTe3t4zMzNpaWkoKChISEgYGBiqqqphYWFWVla4uLjPZxzzAAADn0lEQVRoge3a6XqiMBQG4ICggAtuKEpd7v8qB5XknGwkxBJm5sn3SyntW8JnCCohISEh/3OWif8sP/K+Tv2n3rd6toumyS4jh4noKDqQejK7JpPRUfQ32HOfEewqj30lrwQ79ziX5YIde7TjYAc72MEOdrBJlifxcgp7sy2ben3d3U+Og+Vuz9Ci+uh08M72JcJJK392Ji2pZ97sh0i3Kz1P9lGmo+vgc+5kJyD+wMODF3tPubI4V7e0ezIfusZ1sZe0aNv306zpnj492EW37617vuluMO4e7Ntn1zqjG7r758aD3VEXtqEbiMXAprvY3SusZBsqf/ZJHOLnZ8Mu6/mlX7K33b5sJutmuccw2smmU8uiO076Vs3QycVpbrlTvHj9BTbTnH3YdNDbU/xo1vTxRblvfChPmgnP7VpyjxRRHvb75XdVX+Pc7ERBH7W07v9yvH4XEq2cUGE3Fe66ZhLxUrXTDH6uWlQ5r9cSvGCrnwa6vcIWv2e3h37vKt6clJPpNuKylvCv7g3i4nl7zjQva6kS0rCPdk8kt1Eq3Fg2DHhTXTX4SDbUrJ30c4an3Dm3tbN440oTkrN5l2u7pX3bXRf2lyk033/+Y8DXqHB29melsrekoWY7+uKLYdjhnFvZ9AJthwONFlGxonA2NtwBKWdOITDgC1yRmA07W+9Y2KsIYsaFmkHktpttTJtxLc0VrrCzedqEo4bLczwM+7yyseW73b7CKRqOk/CFM9jwaWHDHulxZcM5HAp3Ntlw1Ct6R9Az7JqG4+S47b02nOvXYsyE99QM4WzYf6pljw306v0cToAKt6JbnH4iF12fehtoeob78N6G40Db6RsWsg3nGsp1UGz7xNBwHNR2ja1mdLix4RzOhl1ti+eaRl041HCb+2DUdoXNN9yEW9YM4dyw87buqF+RC4do28VNjoeds+WG9+HWDcdB13POVjVcjb9+PqDhOKjtyNa/kFT4oIZzRz4X7bynZhAo3CNl9MB3eqBwzD5a0Bh3pgk5C3bJ/pjccBzxqzjWDUcRr2PGc63GB9XMZJuXw4dvaZ1tsxIH3GXAtXZfzSC0cA4109t2NMVdaaVte9/1ukWM1qXbgKtte5qQzfmLG3bZHkJ/F8nun1JGtW1rNobt83tc/+7n/sEOdrCDbWc7X4wdshHshc8I9hSZ1E7N+4yUFL6z4j175cerfpIQUjXm3UZI835LeVNtZ76zrXxOKCEhId7zBxR5NwdS+ssoAAAAAElFTkSuQmCC"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
              alt="cardPic"
            />
          </div>
          <h5>Yashraj</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption......"
        ></textarea>
      </div>
    </div>
  );
}
