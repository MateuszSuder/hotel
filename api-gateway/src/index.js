import router from "./server/router.js";
import connectDb from "./config/db.js";
import express from "express";
import {setLocale} from "yup";
import validationErrorMessages from "./validation/validationErrorMessages.js";

(async () => {
    connectDb();
    const port = process.env.PORT;
    if(!port) throw new Error("No port specified");

    const app = express();

    app.use("/", router);

    setLocale({
        ...validationErrorMessages
    })

    app.listen(port, async () => {
        console.log(`Microservice ${process.env.NAME} running on port ${port}`);
    })
})();