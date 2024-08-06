const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    try{
        const token = req.header("Authorization")
        if(!token){
            res.status(400).json({msg : "invalid Authentication"});
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(500).json({msg : "invalid authnedcaetoin"})

            req.user = user;
            next();
        })

    }catch(err){
        return res.j
    }
}
module.exports = auth;