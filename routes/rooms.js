import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create a room
router.post("/:hotelid", verifyAdmin, createRoom);

//Update room availability
router.put("/availability/:id", updateRoomAvailability);

// update room
router.put("/:id", verifyAdmin, updateRoom);

// Delete a room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// Get a room
router.get("/:id", getRoom);

//Get all rooms
router.get("/", getRooms);

export default router;
