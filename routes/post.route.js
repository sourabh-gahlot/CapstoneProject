const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post("/posts", authMiddleware.verifyToken, postController.createPosts);
  app.get("/posts", authMiddleware.verifyToken, postController.getPosts);
  app.patch("/post/:id", authMiddleware.verifyToken, postController.updatePost);
  app.get(
    "/post/:id",
    authMiddleware.verifyToken,
    postController.getParticularPost
  ); 
  app.delete(  
    "/post/:id",
    authMiddleware.verifyToken,
    postController.deletePost
  );
  app.patch(
    "/post/:id/like",
    authMiddleware.verifyToken,
    postController.likePost
  );
  app.patch(
    "/post/:id/unlike",
    authMiddleware.verifyToken,
    postController.unlikePost
  );
  app.get(
    "/user_posts/:id",
    authMiddleware.verifyToken,
    postController.getUserPost
  );
  app.patch(
    "/savePost/:id",
    authMiddleware.verifyToken,
    postController.savePost
  );
  app.patch(
    "/unSavePost/:id",
    authMiddleware.verifyToken,
    postController.unSavePost
  );
  app.get(
    "/getSavePosts",
    authMiddleware.verifyToken,
    postController.getAllSavedPosts
  );
};
