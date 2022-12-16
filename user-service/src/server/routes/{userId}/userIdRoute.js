import express from "express";

const router = express.Router({ mergeParams: true });

router.get("", async (req, res) => {
    console.log(req.params);
    res.send(`User Id Get: ${req.params.userId}`);
});

router.put("", async (req, res) => {
    res.send("User Id Put");
});

router.delete("", async (req, res) => {
    res.send("User Id Delete");
});

export default router