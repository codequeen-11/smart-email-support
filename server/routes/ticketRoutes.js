const express = require("express");
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/ticketController");
 
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware")
const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.patch("/:id/status", updateTicketStatus);
router.delete("/:id", deleteTicket);

router.post("/", protect, createTicket);

// admin only
router.get("/:id", protect, adminOnly, getTicketById);
router.get("/", protect, adminOnly, getTickets);
router.patch("/:id/status", protect, adminOnly, updateTicketStatus);
router.delete("/:id", protect, adminOnly, deleteTicket);
module.exports = router;