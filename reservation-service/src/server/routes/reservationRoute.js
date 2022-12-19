import express from "express";
import createReservation from "../../services/createReservation/createReservation.js";

const router = express.Router();

router.get("", (req, res) => {
    res.status(501).send(null);
});

router.post("", createReservation);

export default router;