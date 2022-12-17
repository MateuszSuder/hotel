import express from "express";
import getUser from "../../../services/getUser/getUser.js";
import editUser from "../../../services/editUser/editUser.js";
import deleteUser from "../../../services/deleteUser/deleteUser.js";

const router = express.Router({ mergeParams: true });

router.get("", getUser);

router.put("", editUser);

router.delete("", deleteUser);

export default router