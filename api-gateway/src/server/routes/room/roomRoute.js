import express from "express";
import addRoom from "../../../services/room/addRoom.js";
import withAuth from "../../../framework/middlewares/withAuth.js";
import getRooms from "../../../services/room/getRooms.js";

const router = express.Router({ mergeParams: true });

router.get("", getRooms)

router.post("", withAuth({ role: "EMPLOYEE" }), addRoom);

export default router;