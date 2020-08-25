
import mongoose from "mongoose";

const Test = new mongoose.Schema({
    name: {type: String, default: ""},
    val: {type: String, default: "1"},
    timestamp: {type:Date, default: Date.now}
});

export default mongoose.model("TestModel", Test);
