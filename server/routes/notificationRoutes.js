const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", protect, adminOnly, getNotifications);
router.patch("/:id/read", protect, adminOnly, markNotificationAsRead);
router.patch("/read-all", protect, adminOnly, markAllNotificationsAsRead);

module.exports = router;