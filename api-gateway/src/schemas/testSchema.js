import mongoose, {Schema} from "mongoose";

const testSchema = new Schema(
    {
        id: Number
    }
)

export default mongoose.model("test", testSchema)
