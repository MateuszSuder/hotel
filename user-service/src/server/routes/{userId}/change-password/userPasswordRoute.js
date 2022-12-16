import express from "express";

const router = express.Router({ mergeParams: true });

router.put("", async (req, res) => {
    res.send("User Password Post");
});

export default router