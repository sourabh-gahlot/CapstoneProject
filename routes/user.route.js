const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/search", authMiddleware.verifyToken, userController.findAll);
  app.get(
    "/user/:id",
    authMiddleware.verifyToken,
    userController.getUserByUserId
  );
  app.patch("/user", authMiddleware.verifyToken, userController.updateUser);
  app.patch(
    "/user/:id/follow",
    authMiddleware.verifyToken,
    userController.followUser
  );
  app.patch(
    "/user/:id/unfollow",
    authMiddleware.verifyToken,
    userController.unfollowUser
  );
  app.get(
    "/suggestionsUser",
    authMiddleware.verifyToken,
    userController.suggestionsUser
  );
};
