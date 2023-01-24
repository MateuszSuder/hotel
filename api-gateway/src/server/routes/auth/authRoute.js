import express from "express";
import register from "../../../services/auth/register.js";
import login from "../../../services/auth/login.js";
import withAuth from "../../../framework/middlewares/withAuth.js";
import user from "../../../services/auth/user.js";
import activate from "../../../services/auth/activate.js";
import twoFactorQR from "../../../services/auth/twoFactorQR.js";
import twoFactorEnable from "../../../services/auth/twoFactorEnable.js";

const router = express.Router();

router.get("/user", withAuth({ role: "USER" }), user);

router.get("/activate", activate);

router.get("/2fa", withAuth({ role: "USER" }), twoFactorQR);

router.put("/2fa", withAuth({ role: "USER" }), twoFactorEnable);

router.post("/login", login);

router.post("/register", register);

export default router;