import express from "express";
import editRoom from "../../../services/room/editRoom/editRoom.js";
import getRoomById from "../../../services/room/getRoomById/getRoomById.js";
const router = express.Router({ mergeParams: true });

router.get("", getRoomById);

router.post("", editRoom);

export default router;
