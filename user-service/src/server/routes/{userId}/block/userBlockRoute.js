import express from "express";

const router = express.Router({ mergeParams: true });

router.post("", async (req, res) => {
    res.send("User Block Post");
});

export default router