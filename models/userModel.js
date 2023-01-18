import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: String,
        lastName: String
    },
    email: String,
    password: String,
    dateCreated: {
        type: Date,
        default: (Date.now() + 2 * 60 * 60 * 1000)
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImg: String,
    // ref to collection name any ObjectId => Array of Cars ObjectId from mongoose
    myCars: [{ type: mongoose.Types.ObjectId, ref: 'cars' }]
})

export const UserModel = mongoose.model("users", userSchema)