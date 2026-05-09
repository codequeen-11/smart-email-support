
const sendEmail = require("../utils/sendEmail");
const Ticket = require("../models/Ticket");
const classifyTicket = require("../utils/classifyTicket");
const generateReply = require("../utils/generateReply");
const Notification = require("../models/Notification");
const createTicket = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const category = await classifyTicket(message);
    const aiReply = await generateReply(message, category);

    const newTicket = await Ticket.create({
      name,
      email,
      subject,
      message,
      category,
      aiReply,
    });

     await Notification.create({
  title: "New support ticket",
  message: `${newTicket.subject} • ${newTicket.category}`,
  type: "ticket",
  ticket: newTicket._id,
});
    try{
    await sendEmail({
  to: email,
  subject: `Support Reply: ${subject}`,
  message: aiReply,
  category,
});
    }catch(emailError){
      console.error("Error sending email:", emailError.message);}
    

    res.status(201).json({
      success: true,
      message: "Ticket saved successfully",
      data: newTicket,
    });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

 const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

const updateTicketStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Open", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
      data: deletedTicket,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,

};