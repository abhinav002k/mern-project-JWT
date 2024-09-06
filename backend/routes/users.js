const express=require('express')
const router=express.Router()

//controller
const {loginUser,signupUser}=require('../controllers/userController')
//controller

//login route

router.post('/login',loginUser)

//signup route

router.post('/signup',signupUser)

module.exports=router;