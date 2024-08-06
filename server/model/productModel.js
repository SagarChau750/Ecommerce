const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id : {
        type:String,
        unique : true,
        required: true,
        trim : true
    },
    title : {
        type:String,
        trim : true,
        required : true,

    }, 
    price:{
        type: Number,
        required:true,
        trim : true
    },
    description : {
        type:String,
        trim : true,
        required : true,
    }, 
    content : {
        type:String,
        required : true,
    },
    image: {
         type : String,
    },
    category : {
        type:String,
        required : true
    },
    checked : {
        type:Boolean,
        default : false
    },
    sold : {
        type:Number,
        default:0
    }

},{
    timestamps:true
});
module.exports = mongoose.model("Products", productSchema);