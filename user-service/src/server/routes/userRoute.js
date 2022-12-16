import express from "express";

const router = express.Router();

router.get("", async (req, res) => {
    res.send("User Get");
});

router.post("", async (req, res) => {
    res.send("User Post");
});

export default router;