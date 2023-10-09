const Post = require("../models/post.model");
const User = require("../models/user.model");

async function createPosts(req, res) {
  try {
    const loggedInUser = await User.findById(req._id);
    const newPostObj = {
      images: req.body.images,
      content: req.body.content,
    };

    const newPost = await Post.create(newPostObj);
    newPost.user = loggedInUser;
    await newPost.save();

    return res.status(200).send({
      msg: "Created Post!",
      newPost: newPost,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function getPosts(req, res) {
  try {
    const loggedInUser = await User.findById(req._id);
    const posts = await Post.find({});

    let allPosts = posts.filter((post) => {
      return (
        post.user.map((userId) => {
          return userId._id;
        }) == req._id
      );
    });

    return res.status(200).send({
      msg: "Success!",
      result: allPosts.length,
      posts: allPosts,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function updatePost(req, res) {
  try {
    const postOfIdGiven = await Post.findById(req.params.id);

    if (!postOfIdGiven) {
      return res.status(400).send({
        msg: "Enter a valid PostId",
      });
    }

    const userIdOfPostGiven = postOfIdGiven.user.map((user) => {
      return user._id;
    });

    if (userIdOfPostGiven != req._id) {
      return res.status(400).send({
        msg: "Enter the PostId created by You",
      });
    }

    postOfIdGiven.content = req.body.content
      ? req.body.content
      : postOfIdGiven.content;
    postOfIdGiven.images = req.body.images
      ? req.body.images
      : postOfIdGiven.images;

    const updatedPost = await postOfIdGiven.save();

    return res.status(200).send({
      msg: "Updated Post!",
      newPost: updatedPost,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function getParticularPost(req, res) {
  try {
    const particularPost = await Post.findById(req.params.id);

    if (!particularPost) {
      return res.status(400).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"user\"`,
      });
    }

    return res.status(200).send({
      post: particularPost,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function deletePost(req, res) {
  try {
    const deletePost = await Post.findByIdAndRemove(req.params.id);

    if (!deletePost) {
      return res.status(400).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"user\"`,
      });
    }

    return res.status(200).send({
      msg: "Deleted Post!",
      newPost: deletePost,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function likePost(req, res) {
  try {
    const loggedInUser = await User.findById(req._id);
    const likePost = await Post.findById(req.params.id);

    const isValidPostId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidPostId) {
      return res.status(404).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"post\"`,
      });
    }

    if (!likePost) {
      return res.status(400).send({
        msg: "This post does not exist.",
      });
    }

    likePost.likes.push(loggedInUser);
    await likePost.save();

    return res.status(200).send({
      msg: "Liked Post!",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function unlikePost(req, res) {
  try {
    const unlikePost = await Post.findById(req.params.id);

    const isValidPostId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidPostId) {
      return res.status(404).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"post\"`,
      });
    }

    if (!unlikePost) {
      return res.status(400).send({
        msg: "This post does not exist.",
      });
    }

    if (!unlikePost.likes.includes(req._id)) {
      return res.status(200).send({
        msg: "You have already unliked the post",
      });
    }

    unlikePost.likes = unlikePost.likes.filter((user) => {
      return user._id != req._id;
    });

    await unlikePost.save();

    return res.status(200).send({
      msg: "Unliked Post!",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function getUserPost(req, res) {
  try {
    const userPosts = await Post.find({
      user: req.params.id,
    });

    if (!userPosts) {
      return res.status(404).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"post\"`,
      });
    }

    return res.status(400).send({
      posts: userPosts,
      result: userPosts.length,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function savePost(req, res) {
  try {
    const userPosts = await Post.findById(req.params.id);

    const loggedInUser = await User.findById(req._id);

    if (!userPosts) {
      return res.status(404).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"saved\" for model \"post\"`,
      });
    }

    loggedInUser.saved.push(userPosts);
    await loggedInUser.save();

    return res.status(200).send({
      msg: "Saved Post!",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function unSavePost(req, res) {
  try {
    const userPosts = await Post.findById(req.params.id);

    const loggedInUser = await User.findById(req._id);

    if (!userPosts) {
      return res.status(404).send({
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" at path \"saved\" for model \"post\"`,
      });
    }

    if (!loggedInUser.saved.includes(req.params.id)) {
      return res.status(200).send({
        msg: "Post is already unsaved",
      });
    }

    loggedInUser.saved = loggedInUser.saved.filter((post) => {
      return post._id != req.params.id;
    });

    await loggedInUser.save();

    return res.status(200).send({
      msg: "unSaved Post!",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server error",
    });
  }
}

async function getAllSavedPosts(req, res) {
  const loggedInUser = await User.findById(req._id).populate("saved");

  const savedPosts = loggedInUser.saved;

  return res.status(200).send({
    savePosts: savedPosts,
    result: savedPosts.length,
  });
}

module.exports = {
  createPosts: createPosts,
  getPosts: getPosts,
  updatePost: updatePost,
  getParticularPost: getParticularPost,
  deletePost: deletePost,
  likePost: likePost,
  unlikePost: unlikePost,
  getUserPost: getUserPost,
  savePost: savePost,
  unSavePost: unSavePost,
  getAllSavedPosts: getAllSavedPosts,
};
