import express from "express";
import withAuth from "../../../../../framework/middlewares/withAuth.js";
import changePassword from "../../../../../services/user/changePassword.js";

const router = express.Router({ mergeParams: true });

router.put("/", withAuth({ role: "USER" }), changePassword);

export default router;