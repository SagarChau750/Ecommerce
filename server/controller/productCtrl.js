const Products = require('../model/productModel')

//fiter, sorting, pagination
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString
    }

    filtering(){
        const queryObj = {...this.queryString}; // Copy query string
        const excludedFields = ['page', 'sort', 'limit']; // Fields to exclude from filtering
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match);
       // console.log(queryStr, queryObj)

        this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default sort by creation date
        }
        return this;
    }

    pagination(){
        const page = this.queryString.page * 1 || 1; // Convert to number or default to 1
        const limit = this.queryString.limit * 1 || 10; // Convert to number or default to 10
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    getProducts : async(req, res)=>{
        try{
            console.log(req.query)

            const features = new APIfeatures(Products.find(), req.query).filtering();
            const product = await features.query
            res.json(product)

        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    }, 

    createProducts : async(req, res)=>{
        try{
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images){
                return res.status(400).json({msg:"No image upload"})
            }
            const product = await Products.findOne({product_id});
            if(product) return res.status(500).json({msg : "product already exist"});

            const newPorduct = new Products({
                product_id , title : title.toLowerCase(), price, description, content, images, category
            })

            await newPorduct.save();
            res.json({msg:"createrd product"});

        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    }, 
    updateProducts : async(req, res)=>{
        try{
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(500).json({msg : "No image upload"})
            
            await Products.findOneAndUpdate({_id:req.params.id}, {
                title : title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg : "updated a product"});

        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    }, 
    deleteProducts : async(req, res)=>{
        try{
            await Products.findOneAndDelete({_id : req.params.id});
            res.json({msg : "deleted a product"});


        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    }
}

module.exports = productCtrl;