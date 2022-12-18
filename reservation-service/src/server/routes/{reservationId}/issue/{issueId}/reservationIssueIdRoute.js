import express from "express";

const router = express.Router();

router.get("", (req, res) => {
    res.status(501).send(null);
});

router.post("", (req, res) => {
    res.status(501).send(null);
});

export default router;
