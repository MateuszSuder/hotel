import express from "express";
import getReservations from "../../../services/reservation/getReservations.js";
import addReservation from "../../../services/reservation/addReservation.js";
import withAuth from "../../../framework/middlewares/withAuth.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getReservations);
router.post("/", withAuth({ role: "USER" }), addReservation);

export default router;