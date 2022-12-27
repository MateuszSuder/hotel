import express from "express";
import register from "../../../services/auth/register.js";
import login from "../../../services/auth/login.js";
import withAuth from "../../../framework/middlewares/withAuth.js";
import user from "../../../services/auth/user.js";

const router = express.Router();

router.get("/user", withAuth({ role: "USER" }), user);

router.get("/2fa", (req, res) => {
    res.status(501).send("login");
});

router.post("/2fa", (req, res) => {
    res.status(501).send("login");
});

router.post("/login", login);

router.post("/register", register);

export default router;