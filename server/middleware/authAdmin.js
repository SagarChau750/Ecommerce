const Users = require("../model/userModel")

const authAdmin = async (req, res, next) =>{
    try{
        const user = await Users.findOne({
            _id : req.user.id
        })
        if(user.role === 0){
            return res.status(400).json({msg : "admin resource denied"});
        }
        next();
    }catch(err){
        return res.status(500).json({msg : err.message});
    }
}
module.exports = authAdmin;