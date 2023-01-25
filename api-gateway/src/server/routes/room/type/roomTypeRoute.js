import express from "express";
import addRoomType from "../../../../services/room/addRoomType.js";
import getRoomTypes from "../../../../services/room/getRoomTypes.js";
import withAuth from "../../../../framework/middlewares/withAuth.js";

const router = express.Router({ mergeParams: true });

router.get("", getRoomTypes)

router.post("", withAuth({ role: "EMPLOYEE" }), addRoomType);

export default router;