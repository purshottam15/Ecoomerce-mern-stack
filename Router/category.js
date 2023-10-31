const express=require('express');
const router=express.Router();
const Category=require('../models/Category.js')




router.post('/',async(req,res)=>{
    try {
        
        const category=await Category.create(req.body);
        if(category){
            res.json(category)
        }

    } catch (error) {
        if(error){
            res.json({status:500,error})
        }
    }
})


router.get('/', async (req, res) => {
    try {
        

        const allCategory = await Category.find({})
        res.json(allCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports=router