import mongoose from "mongoose";

const url = `mongodb://${process.env.DB_CONTAINER_NAME}:${process.env.DB_PORT}/hotel`;

const connectDb = () => {
    try {
        mongoose.connect(url, {
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            authSource: "admin",
            monitorCommands: true
        }, (error) => {
            if(error) {
                console.error("error", error)
            } else {
                console.log("connected");
            }
        })
    } catch (e) {
        console.error(e);
    }

};

export default connectDb;