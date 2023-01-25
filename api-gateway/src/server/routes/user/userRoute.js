import express from "express";
import getUsers from "../../../services/user/getUsers.js";
import withAuth from "../../../framework/middlewares/withAuth.js";

const router = express.Router();

router.get("/", withAuth({ role: "EMPLOYEE" }), getUsers);

export default router;