import express from "express";
import getIssue from "../../../../../../services/reservation/issue/getIssue.js";
import sendReservationIssueMessage from "../../../../../../services/reservation/issue/sendReservationIssueMessage.js";
import withAuth from "../../../../../../framework/middlewares/withAuth.js";
import endIssue from "../../../../../../services/reservation/issue/endIssue.js";

const router = express.Router({ mergeParams: true });

router.get("/", withAuth({ role: "USER" }), getIssue);
router.put("/", withAuth({ role: "USER" }), endIssue);
router.post("/", withAuth({ role: "USER" }), sendReservationIssueMessage);

export default router;