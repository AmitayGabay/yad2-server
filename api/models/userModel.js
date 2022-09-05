const mongoose = require("mongoose");

const product = {
    id:String,
    name: String,
    info: String,
    categoryName: String,
    price: Number,
    image: String,
    amount: Number
}
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    cart: [product]
})

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;