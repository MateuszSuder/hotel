import express from "express";
import activateUser from "../../../../services/activateUser/activateUser.js";

const router = express.Router({ mergeParams: true });

router.put("", activateUser);

export default router