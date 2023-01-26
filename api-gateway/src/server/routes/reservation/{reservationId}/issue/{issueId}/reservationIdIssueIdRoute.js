import express from "express";
import getIssue from "../../../../../../services/reservation/issue/getIssue.js";
import sendReservationIssueMessage from "../../../../../../services/reservation/issue/sendReservationIssueMessage.js";
import withAuth from "../../../../../../framework/middlewares/withAuth.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getIssue);
router.post("/", withAuth({ role: "USER" }), sendReservationIssueMessage);

export default router;