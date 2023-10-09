const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post(
    "/comment",
    authMiddleware.verifyToken,
    commentController.addComment
  );

  app.post(
    "/comment/:id",
    authMiddleware.verifyToken,
    commentController.updateComment
  );
  app.post(
    "/comment/:id/like",
    authMiddleware.verifyToken,
    commentController.likeComment
  );
  app.post(
    "/comment/:id/unlike",
    authMiddleware.verifyToken,
    commentController.unlikeComment
  );
  app.delete(
    "/comment/:id",
    authMiddleware.verifyToken,
    commentController.deleteComment
  );
};
