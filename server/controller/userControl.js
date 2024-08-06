const Users = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');



const userController = {
    register: async(req, res)=>{
        try{
            const { name, email, password} = req.body;
            const user = await Users.findOne({email});
            if(user){
                return res.status(400).json({msg : "email already registerd"});
            }
            if(password.length < 6){
                return res.status(400).json({msg : "password must be atleast 6 character"});
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new Users({
                name, email,  password: hashPassword

            })
            await newUser.save();

            //creating jst token
            const accesstoken = createAccessToken({id:newUser._id});
            const refreshToken = createRefreshtoken({id : newUser._id});
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                secure: process.env.NODE_ENV === 'production', // ensure secure cookie in production
                sameSite: 'strict'
            });

            res.json({
                msg: "Registered successfully",
                accesstoken,
                refreshToken
            });
        }catch(err){
            return res.status(500).json({msg : err.message});
        }
    }, 
    refreshToken : async(req, res) =>{
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) {
                return res.status(400).json({ msg: "Please login or Register" });
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login or register" });

                const accessToken = createAccessToken({ id: user.id });
                res.json({user, accessToken });
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login : async (req, res)=>{
        try{
            const {email, password} = req.body;


            const user = await Users.findOne({email});
            if(!user){
                return res.status(400).json({msg : "user does not exist , please register first"});

            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg : "password doesnt match"});

            const accessToken = createAccessToken({id : user._id});
            const refreshtoken = createRefreshtoken({id : user._id});

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly : true,
                path : '/user/refresh_token'
            })

            //res.json({msg : "login successfull"});
            res.json({accessToken});

        }catch(err){
            return res.status(500).json({msg : err.message});
        }
    }, 

    logout : (req, res)=>{
        try{
            res.clearCookie('refreshtoken', {path : 'user/refresh_token'})
            return res.json({msg :" log out "})

        }catch(err){
            return res.status(500).json({msg : err.message});

        }
    }, 
    getUser : async (req, res) =>{
        try{
            const user = await Users.findById(req.user.id).select('-password');
            if(!user){
               return res.status(400).json({msg : "user not found"});
            }
            res.json(user);
        }
        catch(err){
            return res.status(500).json({msg : err.message});

        }
    }

    
}

const createAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1d'})
}
const createRefreshtoken = (payload)=>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '1d'})
}

module.exports = userController;