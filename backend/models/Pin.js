const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 60,
    },
    desc: {
        type: String,
        required: true,
        min: 3,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    price: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    comments: {
        type: [String],
        required: true,
    },
},
{ timestamps: true }
);
module.exports = mongoose.model("Pin", PinSchema);