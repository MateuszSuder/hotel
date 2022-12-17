import express from "express";
import getRooms from "../../services/getRooms/getRooms.js";
import createRoom from "../../services/createRoom/createRoom.js";
const router = express.Router();

router.get("", getRooms);

router.post("", createRoom);

export default router;