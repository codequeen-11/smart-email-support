require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
connectDB();

app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/tickets", ticketRoutes);
app.use("/api/notifications", notificationRoutes);
// 404 middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});