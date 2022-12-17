import express from "express";
import createRoomType from "../../../services/createRoomType/createRoomType.js";
const router = express.Router();

//router.get("", getRooms);

router.post("", createRoomType);

export default router;