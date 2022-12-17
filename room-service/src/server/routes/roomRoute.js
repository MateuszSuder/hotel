import express from "express";
import getRooms from "../../services/getRoomTypes/getRoomTypes.js";
import createRoom from "../../services/createRoom/createRoom.js";
const router = express.Router();

router.get("", getRooms);

router.post("", createRoom);

export default router;