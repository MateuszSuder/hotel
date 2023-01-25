import express from "express";
import createReservation from "../../services/createReservation/createReservation.js";
import getReservations from "../../services/getReservations/getReservations.js";

const router = express.Router();

router.get("", getReservations);

router.post("", createReservation);

export default router;