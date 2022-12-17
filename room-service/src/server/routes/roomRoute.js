import express from "express";
import getRooms from "../../services/roomType/getRoomTypes/getRoomTypes.js";
import createRoom from "../../services/room/createRoom/createRoom.js";
const router = express.Router();

router.get("", getRooms);

router.post("", createRoom);

export default router;