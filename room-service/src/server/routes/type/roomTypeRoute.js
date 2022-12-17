import express from "express";
import createRoomType from "../../../services/createRoomType/createRoomType.js";
import getRooms from "../../../services/getRoomTypes/getRoomTypes.js";
const router = express.Router();

router.get("", getRooms);

router.post("", createRoomType);

export default router;