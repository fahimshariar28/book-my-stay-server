import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import hotelsRoutes from "./routes/hotels.js";
import roomsRoutes from "./routes/rooms.js";

const app = express();
dotenv.config();
const port = 5000;

// Mongoose connection
const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/hotels", hotelsRoutes);
app.use("/rooms", roomsRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
    stack: error.stack,
  });
});

app.listen(port, () => {
  connectMongoose();
  console.log(`Book My Stay server in running on ${port}`);
});
