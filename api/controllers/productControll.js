const ProductModel = require("../models/productModel");

const productCtrl = {
    addProduct: async (req, res) => {
        try {
            const newProduct = await ProductModel.create(req.body);
            await newProduct.save();
            res.json(newProduct);
        } catch (err) {
            console.log(err);
        }
    },
    getProducts: async (req, res) => {
        let page = req.query.page || 1;
        let limit = req.query.page || 10;
        try {
            let products = await ProductModel.find({}).skip((page - 1) * limit).limit(limit).populate({ path: "category", select: "name" })
            res.json(products)
        } catch (err) {
            console.log(err);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let resp = await ProductModel.deleteOne({ _id: req.query.id })
            res.json(resp)
        } catch (err) {
            console.log(err);
        }
    },
    updateProduct: async (req, res) => {
        try {
            let resp = await ProductModel.updateOne({ _id: req.query.id }, req.body)
            return res.json(resp)
        }
        catch (err) {
            console.log(err)
        }
    }

}
module.exports = productCtrl;