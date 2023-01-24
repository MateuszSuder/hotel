import express from "express";
import addRoom from "../../../services/room/addRoom.js";

const router = express.Router();

router.post("", addRoom);

export default router;