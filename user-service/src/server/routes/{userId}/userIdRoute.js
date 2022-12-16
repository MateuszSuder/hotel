import express from "express";
import getUser from "../../../services/getUser/getUser.js";

const router = express.Router({ mergeParams: true });

router.get("", getUser);

router.put("", async (req, res) => {
    res.send("User Id Put");
});

router.delete("", async (req, res) => {
    res.send("User Id Delete");
});

export default router