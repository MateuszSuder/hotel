import express from "express";
import getUser from "../../../services/getUser/getUser.js";
import editUser from "../../../services/editUser/editUser.js";

const router = express.Router({ mergeParams: true });

router.get("", getUser);

router.put("", editUser);

router.delete("", async (req, res) => {
    res.send("User Id Delete");
});

export default router