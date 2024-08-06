const Category = require('../model/categoryModels');

const categoryCtrl = {
    getCategory : async (req, res)=>{
        try{
            const categories = await Category.find();
            res.json(categories);

        }catch(err){
            return res.status(400).json({msg : err.message});
        }
    },

    createCategory : async (req, res) => {
        try {

            const {name} = req.body;
            const category = await Category.findOne({name})

            if(category) return res.status(400).json({msg : "category already exist"});

            const newCategory = new Category({name});
            await newCategory.save();

            res.json('Check Admin Success');

        }catch(err){
            return res.status(400).json({msg : err.message});
        }
    }, 

    deleteCategory : async(req, res)=>{
        try{
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg : "deleted a category"})

        }catch(err){
            return res.status(400).json({msg : err.message});
        }
    },

    updateCategory: async (req, res)=>{
        try{
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id:req.params.id}, {name})

            res.json({msg : "Updated"});

        }catch(err){
            return res.status(400).json({msg : err.message});

        }
    }
}
module.exports = categoryCtrl;

