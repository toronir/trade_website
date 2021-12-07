const Category = require('../models/categoryModel');
const Products = require('../models/productModel');

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    createCategory: async (req, res) =>{
        try {
            // jezeli user ma role = 1 to jest to admin
            // tylko admin moze obslugiwac crud kategorii
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg: "tak kategoria jest juz"});

            const newCategory = new Category({name});

            await newCategory.save();
            res.json({msg: "stworzono nowa kategorie"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id});
            if(products) return res.status(400).json({
                msg: "usun powiazane produkty"
            });
            await Category.findByIdAndDelete(req.params.id);
            res.json({msg: "usunieto kategorie"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name});

            res.json({msg: "kategoria zaktualizowana"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
};


module.exports = categoryCtrl;