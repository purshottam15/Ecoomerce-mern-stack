const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart.js')




router.post('/', async (req, res) => {
    try {
        const {id}=req.user;
        
        let newProduct={...req.body,userId:id}

        const product = await Cart.create(newProduct);
        if (product) {
            res.json(product)
        }

    } catch (error) {
        if (error) {
            res.json({ status: 500, error })
        }
    }
})


router.get('/', async (req, res) => {
    try {
        let {id}=req.user
       
        let cartItem = await Cart.find({userId:id});

        

       
        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// router.get('/', async (req, res) => {
//     try {
//         let id = req.params.id;
//         const product = await Products.findById(id);
//         res.json(product)



//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });




router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const updatedProduct = req.body;
        const itemUpdated = await Cart.findByIdAndUpdate(id, updatedProduct, { new: true });
       
        if (itemUpdated) {
            res.json(itemUpdated)

        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const deletedProduct=await Cart.findByIdAndDelete(id);
        if(deletedProduct){
            res.send(deletedProduct);
        }
      
       
    



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






module.exports = router