import express from "express";
import issueSendMessage from "../../../../../services/issue/addMessage/issueSendMessage.js";
import getIssue from "../../../../../services/issue/getIssue/getIssue.js";
import endIssue from "../../../../../services/issue/changeIssueStatus/endIssue.js";

const router = express.Router({ mergeParams: true });

router.get("", getIssue);
router.post("", issueSendMessage);
router.put("", endIssue);

export default router;
