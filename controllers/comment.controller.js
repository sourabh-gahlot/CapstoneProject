const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

async function addComment(req, res) {
  const post = await Post.findById(req.body.postId);
  const loggedInUser = await User.findById(req._id);

  if (!post) {
    return res.status(400).send({
      msg: "This Post does not exist.",
    });
  }
  let newData;
  if (req.body.reply != undefined) {
    const commentToBeReplied = await Comment.findById(req.body.reply);

    if (!commentToBeReplied) {
      return res.status(400).send({
        msg: "This comment does not exist.",
      });
    }

    newData = {
      content: req.body.content,
      likes: [],
      postId: req.body.postId,
      postUserId: req.body.postUserId,
      reply: req.body.reply,
    };

    const newComment = await Comment.create(newData);

    commentToBeReplied.reply.push(newComment);

    await commentToBeReplied.save();

    return res.status(200).send(loggedInUser);
  } else {
    newData = {
      content: req.body.content,
      likes: req.body.likes,
      postId: req.body.postId,
      postUserId: req.body.postUserId,
    };

    newData.user = loggedInUser;

    const newComment = await Comment.create(newData);

    return res.status(200).send(loggedInUser);
  }
}

async function updateComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(400).send({
        msg: `"Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"comment\"`,
      });
    }

    const post = await Post.findById({
      _id: comment.postId.map((post) => {
        return post._id;
      }),
    });

    if (!post) {
      return res.status(400).send({
        msg: "This post does not exist.",
      });
    }

    comment.content = req.body.content ? req.body.content : comment.content;
    const updatedComment = await comment.save();

    return res.status(200).send({
      msg: "Update Success!",
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
}

async function likeComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    const loggedInUser = await User.findById(req._id);

    if (!comment) {
      return res.status(400).send({
        msg: `"Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"comment\"`,
      });
    }

    comment.likes.push(loggedInUser);
    await comment.save();
    return res.status(200).send({
      msg: "Liked Comment!",
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
}

async function unlikeComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(400).send({
        msg: `"Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"comment\"`,
      });
    }

    comment.likes = comment.likes.filter((user) => {
      return user._id != req._id;
    });

    await comment.save();

    return res.status(200).send({
      msg: "Unliked Comment!",
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(400).send({
        msg: `"Cast to ObjectId failed for value \"${req.params.id}\" at path \"_id\" for model \"comment\"`,
      });
    }

    return res.status(200).send({
      msg: "Deleted Comment!",
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  addComment: addComment,
  updateComment: updateComment,
  likeComment: likeComment,
  unlikeComment: unlikeComment,
  deleteComment: deleteComment,
};
