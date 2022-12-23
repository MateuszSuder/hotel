import express from "express";
import getReservationById from "../../../services/getReservationById/getReservationById.js";
import editReservation from "../../../services/editReservation/editReservation.js";

const router = express.Router({ mergeParams: true });

router.get("", getReservationById);

router.put("", editReservation);

router.delete("", (req, res) => {
    res.status(501).send(null);
});


export default router;