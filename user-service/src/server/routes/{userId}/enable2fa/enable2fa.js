import express from "express";
import enable2fa from "../../../../services/enable2fa/enable2fa.js";

const router = express.Router({ mergeParams: true });

router.put("", enable2fa);

export default router