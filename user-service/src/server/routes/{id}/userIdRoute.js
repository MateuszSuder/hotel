import express from "express";

const router = express.Router();

router.get("", async (req, res) => {
    res.send("User Id Get");
});

export default router