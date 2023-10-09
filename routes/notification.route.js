const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post(
    "/notification",
    authMiddleware.verifyToken,
    notificationController.createNotification
  );
  app.delete(
    "/notification/:id",
    authMiddleware.verifyToken,
    notificationController.removeNotification
  );
  app.get(
    "/notifications",
    authMiddleware.verifyToken,
    notificationController.getNotification
  );
  app.patch(
    "/isReadNotification/:id",
    authMiddleware.verifyToken,
    notificationController.updateReadStatus
  );
  app.delete(
    "/deleteAllNotification",
    authMiddleware.verifyToken,
    notificationController.deleteAllNotifications
  );
};
