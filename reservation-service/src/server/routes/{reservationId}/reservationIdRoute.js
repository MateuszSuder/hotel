import express from "express";
import getReservationById from "../../../services/getReservationById/getReservationById.js";

const router = express.Router({ mergeParams: true });

router.get("", getReservationById);

router.put("", (req, res) => {
    res.status(501).send(null);
});

router.delete("", (req, res) => {
    res.status(501).send(null);
});


export default router;