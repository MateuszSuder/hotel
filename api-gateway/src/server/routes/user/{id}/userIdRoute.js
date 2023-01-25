import express from "express";
import withAuth from "../../../../framework/middlewares/withAuth.js";
import getUser from "../../../../services/user/getUser.js";
import editUser from "../../../../services/user/editUser.js";
import deleteUser from "../../../../services/user/deleteUser.js";

const router = express.Router();

router.get("/", withAuth({ role: "EMPLOYEE" }), getUser);
router.put("/", withAuth({ role: "USER" }), editUser);
router.delete("/", withAuth({ role: "ADMIN" }), deleteUser);

export default router;