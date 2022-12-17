import express from "express";
import getRoomType from "../../../../services/roomType/getRoomType/getRoomType.js";
import editRoomType from "../../../../services/roomType/editRoomType/editRoomType.js";
const router = express.Router({ mergeParams: true });

router.get("", getRoomType);

router.put("", editRoomType);

export default router;