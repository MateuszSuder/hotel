import express from "express";
import createIssue from "../../../../services/issue/createIssue/createIssue.js";

const router = express.Router({ mergeParams: true });

router.get("", (req, res) => {
    res.status(501).send(null);
});

router.post("", createIssue);

router.put("", (req, res) => {
    res.status(501).send(null);
});

export default router;
