const express=require('express');
const router=express.Router();
const Brands=require('../models/Brands.js')




router.post('/',async(req,res)=>{
    try {
        
        const brand=await Brands.create(req.body);
        if(brand){
            res.json(brand)
        }

    } catch (error) {
        if(error){
            res.send(error)
        }
    }
})


router.get('/', async (req, res) => {
    try {
        

        const allBrands = await Brands.find({})
        res.json(allBrands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports=router