const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: String,
    info: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    price: Number,
    image: String,
    isBan: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;