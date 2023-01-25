import express from "express";
import getReservationIssues from "../../../../../services/reservation/issue/getReservationIssues.js";
import withAuth from "../../../../../framework/middlewares/withAuth.js";
import createReservationIssue from "../../../../../services/reservation/issue/createReservationIssue.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getReservationIssues);
router.post("/", withAuth({ role: "USER" }), createReservationIssue);

export default router;