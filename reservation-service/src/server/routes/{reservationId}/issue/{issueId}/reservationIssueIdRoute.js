import express from "express";
import issueSendMessage from "../../../../../services/issue/addMessage/issueSendMessage.js";
import getIssue from "../../../../../services/issue/getIssue/getIssue.js";

const router = express.Router({ mergeParams: true });

router.get("", getIssue);

router.post("", issueSendMessage);

export default router;
