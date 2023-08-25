import express from "express";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "./../utils/verifyToken.js";
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";

const router = express.Router();

// create a hotel
router.post("/", verifyAdmin, createHotel);

// update a hotel
router.put("/:id", verifyAdmin, updateHotel);

// delete a hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// get a hotel
router.get("/:id", getHotel);

// get all hotels
router.get("/", getHotels);

export default router;
