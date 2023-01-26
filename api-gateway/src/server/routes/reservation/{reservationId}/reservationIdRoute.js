import express from "express";
import getReservation from "../../../../services/reservation/getReservation.js";
import deleteReservation from "../../../../services/reservation/deleteReservation.js";
import withAuth from "../../../../framework/middlewares/withAuth.js";
import endReservation from "../../../../services/reservation/endReservation.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getReservation);
router.put("/", withAuth({ role: "EMPLOYEE" }), endReservation);
router.delete("/", withAuth({ role: "EMPLOYEE" }), deleteReservation);

export default router;