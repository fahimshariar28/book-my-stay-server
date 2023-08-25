import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

app.get("/", (req, res) => {
  res.send("Hello Book My Stay!");
});

app.listen(port, () => {
  connectMongoose();
  console.log(`Book My Stay server in running on ${port}`);
});
