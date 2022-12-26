import express from "express";
import register from "../../../services/auth/register.js";
import login from "../../../services/auth/login.js";

const router = express.Router();

router.get("/user", (req, res) => {
    res.status(501).send("login");
});

router.get("/2fa", (req, res) => {
    res.status(501).send("login");
});

router.post("/2fa", (req, res) => {
    res.status(501).send("login");
});

router.post("/login", login);

router.post("/register", register);

export default router;