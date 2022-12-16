import express from "express";
import createUser from "../../services/createUser/createUser.js";
import getUsers from "../../services/getUsers/getUsers.js";

const router = express.Router();

router.get("", getUsers);

router.post("", createUser);

export default router;