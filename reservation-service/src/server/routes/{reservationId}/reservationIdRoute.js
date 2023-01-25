import express from "express";
import getReservationById from "../../../services/getReservationById/getReservationById.js";
import editReservation from "../../../services/editReservation/editReservation.js";
import deleteReservation from "../../../services/deleteReservation/deleteReservation.js";

const router = express.Router({ mergeParams: true });

router.get("", getReservationById);

router.put("", editReservation);

router.delete("", deleteReservation);


export default router;