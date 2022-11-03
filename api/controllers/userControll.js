const UserModel = require("../models/userModel");
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const ProductModel = require("../models/productModel");

const userCtrl = {
    // signUp route
    createUser: async (req, res) => {
        let user = req.body;
        try {
            user.password = await bcrypt.hash(user.password, 10)
            let newUser = await UserModel.create(user);
            await newUser.save()
            newUser.password = "******"
            res.json({ newUser, status: true })
        } catch (err) {
            console.log(err)
        }
    },
    logIn: async (req, res) => {
        let user = req.body;
        try {
            let myUser = await UserModel.findOne({ email: user.email });
            if (!myUser) {
                return res.json({ msg: "your email not exists in the system" })
            }
            if (!await bcrypt.compare(user.password, myUser.password)) {
                return res.json({ msg: "wrong password" })
            }
            let token = jwt.sign({ id: myUser._id, role: myUser.role }, process.env.SECRET_KEY)
            res.json({ token })
        }
        catch (err) {
            console.log(err)
        }

    },
    apdateCart: async (req, res) => {
        let productId = req.query.id
        let action = req.query.action;
        let amount = 1;
        if (!action) return res.json({ msg: "you need to send query action plus or minus" })
        let productToCart = {};
        let product = [];
        try {
            let user = await UserModel.findOne({ _id: req.tokenPayload.id })
            if (action === "plus") {
                product = user.cart.find(item => {
                    if (item.id == productId) {
                        item.amount = item.amount + 1;
                        return item
                    }
                })
                if (product) {
                    await user.save();
                    return res.json({ msg: "amount updated" })
                }
                else {
                    let product = await ProductModel.findOne({ _id: productId }).populate({ path: "category", select: "name" });
                    productToCart = {
                        id: product._id,
                        name: product.name,
                        categoryName: product.category.name,
                        price: product.price,
                        image: product.image,
                        amount: 1
                    }
                    user.cart.push(productToCart)
                    await user.save()
                    res.json(productToCart)
                }
            }
            else {
                product = user.cart.find(item => {
                    if (item.id == productId) {
                        item.amount = item.amount - 1;
                        amount = item.amount;
                        return item
                    }
                })
                if(!product){
                    return res.json({msg:"the product is not in cart"})
                }
                if (product && amount) {
                    await user.save();
                    return res.json({ msg: "amount updated" })
                }
                else {
                    user.cart = user.cart.filter(item => item.id != productId)
                    await user.save();
                    return res.json({ msg: "product deleted from cart" })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    },
}
module.exports = userCtrl;
// id:String,
// name: String,
// info: String,
// categoryName: String,
// price: Number,
// image: String,
// amount: Number