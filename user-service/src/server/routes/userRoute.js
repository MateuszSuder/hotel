import express from "express";
import createUser from "../../services/createUser/createUser.js";

const router = express.Router();

router.get("", async (req, res) => {
    res.send("User Get");
});

router.post("", createUser);

export default router;