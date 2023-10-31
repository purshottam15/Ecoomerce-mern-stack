const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/',async(req,res)=>{
    let {id}=req.user
    const userInfo=await User.findById(id);
    if(userInfo){
        res.json(userInfo);
    }

})


module.exports=router
