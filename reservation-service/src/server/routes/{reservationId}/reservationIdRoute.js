import express from "express";
import getReservationById from "../../../services/getReservationById/getReservationById.js";
import endReservation from "../../../services/endReservation/endReservation.js";
import deleteReservation from "../../../services/deleteReservation/deleteReservation.js";

const router = express.Router({ mergeParams: true });

router.get("", getReservationById);

router.put("", endReservation);

router.delete("", deleteReservation);


export default router;