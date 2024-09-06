//Models
const User = require("../models/userModel");
//Models

//JWT
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET, {expiresIn:'3d'})
}

//login User

const loginUser=async(req,res)=>{

    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token=createToken(user._id)
        res.status(200).json({ mesg: "login page", email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//signup User
const signupUser = async (req, res) => {
    console.log(req.body);  // Add this line to log the received data

    const { email, password } = req.body;
    

    try {
        const user = await User.signup(email, password);
        const token=createToken(user._id)
        res.status(200).json({ mesg: "sign page", email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports={signupUser,loginUser}