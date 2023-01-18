import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    year: String,
    img: String,
    price: Number,
    description: String,
    videoLink: String,
    dateCreated: {
        type: Date,
        default: (Date.now() + 2 * 60 * 60 * 1000)
    },
    user_id: mongoose.Types.ObjectId
})

export const CarModel = mongoose.model("cars", carSchema)