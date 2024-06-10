const express=require('express');
const router=express.Router();
const {handleUserSignup,handleUserLogin}=require('../controllers/userController')
const user=require('../models/user');

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports=router;