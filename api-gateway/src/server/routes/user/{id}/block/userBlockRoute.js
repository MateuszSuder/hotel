import express from "express";
import blockUser from "../../../../../services/user/blockUser.js";
import withAuth from "../../../../../framework/middlewares/withAuth.js";

const router = express.Router({ mergeParams: true });

router.post("/", withAuth({ role: "ADMIN" }), blockUser);

export default router;