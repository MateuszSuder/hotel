import express from "express";
import getRoomType from "../../../../../services/room/getRoomType.js";
import editRoomType from "../../../../../services/room/editRoomType.js";
import withAuth from "../../../../../framework/middlewares/withAuth.js";

const router = express.Router({ mergeParams: true });

router.get("", getRoomType)

router.put("", withAuth({ role: "EMPLOYEE" }), editRoomType);

export default router;