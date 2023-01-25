import express from "express";
import createIssue from "../../../../services/issue/createIssue/createIssue.js";
import getIssues from "../../../../services/issue/getIssues/getIssues.js";

const router = express.Router({ mergeParams: true });

router.get("", getIssues);

router.post("", createIssue);

router.put("", (req, res) => {
    res.status(501).send(null);
});

export default router;
