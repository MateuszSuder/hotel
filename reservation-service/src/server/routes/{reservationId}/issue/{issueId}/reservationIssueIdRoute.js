import express from "express";
import issueSendMessage from "../../../../../services/issue/issueSendMessage.js";

const router = express.Router({ mergeParams: true });

router.get("", (req, res) => {
    res.status(501).send(null);
});

router.post("", issueSendMessage);

export default router;
