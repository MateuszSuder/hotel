import express from "express";
import changePassword from "../../../../services/changePassword/changePassword.js";

const router = express.Router({ mergeParams: true });

router.put("", changePassword);

export default router