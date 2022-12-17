import express from "express";
import createRoomType from "../../../services/roomType/createRoomType/createRoomType.js";
import getRoomTypes from "../../../services/roomType/getRoomTypes/getRoomTypes.js";
const router = express.Router();

router.get("", getRoomTypes);

router.post("", createRoomType);

export default router;