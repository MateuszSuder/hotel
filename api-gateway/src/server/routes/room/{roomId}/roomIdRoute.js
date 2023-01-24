import express from "express";
import getRoom from "../../../../services/room/getRoom.js";
import withAuth from "../../../../framework/middlewares/withAuth.js";
import editRoom from "../../../../services/room/editRoom.js";

const router = express.Router({ mergeParams: true });

router.get("", getRoom)

router.put("", withAuth({ role: "EMPLOYEE" }), editRoom);

export default router;