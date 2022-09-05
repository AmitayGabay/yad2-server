const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: String,
    image:String
})

const CatModel = mongoose.model("categories", catSchema);

module.exports = CatModel;