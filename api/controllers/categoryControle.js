const CatModel = require("../models/categoriesModel")


const categoryCtrl = {
    addCategory: async (req, res) => {
        try {
            let newCat = await CatModel.create(req.body);
            await newCat.save();
            res.json(newCat)
        }
        catch (err) {
            console.log(err)
        }
    },
    deleteCategory: async (req, res) => {
        let resp = await CatModel.deleteOne({ _id: req.query.id });
        res.json(resp);
    },
    getAllCategories: async (req, res) => {
    let categories=await CatModel.find({});
    res.json(categories);
    }
}
module.exports =categoryCtrl;