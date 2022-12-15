import express from "express";
import health from "../../../services/health/health.js";
import testSchema from "../../../schemas/testSchema.js";

const router = express.Router();


router.get("/", health);
router.post("/:id", async (req, res) => {
    const {id} = (req.params);
    console.log(id);

    const newEntry = new testSchema({ id });
    await newEntry.save();
    res.send("OK");
});

export default router;