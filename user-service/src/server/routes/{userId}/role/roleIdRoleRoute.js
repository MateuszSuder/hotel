import express from "express";
import changeRole from "../../../../services/changeRole/changeRole.js";

const router = express.Router({ mergeParams: true });

router.put("", changeRole);

export default router