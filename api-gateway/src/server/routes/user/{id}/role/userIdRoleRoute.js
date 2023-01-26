import changeRole from "../../../../../services/user/changeRole.js";
import withAuth from "../../../../../framework/middlewares/withAuth.js";
import express from "express";

const router = express.Router({ mergeParams: true });

router.put("/", withAuth({ role: "ADMIN" }), changeRole);

export default router;