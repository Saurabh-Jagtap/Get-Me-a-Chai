import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayID: {type: String},
    razorpaySecret: {type: String},
    createdAt: {type: Date},
    updatedAt: {type: Date},
}, { timestamps: true })

export default mongoose.models.User || model("User",UserSchema);