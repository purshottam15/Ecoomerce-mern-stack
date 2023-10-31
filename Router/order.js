const express = require('express');
const router = express.Router();
const Order = require('../models/Order.js')




router.post('/', async (req, res) => {
    try {


        const {id}=req.user;
        const newOrder=req.body;

        const order=await Order.create({...newOrder,userId:id});
        if(order){
            res.status(200).send(order)
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
        let userOrder = await Order.find({userId:id});

        

       if(userOrder){

           res.json(userOrder);
       }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/all', async (req, res) => {
    try {
       
        const product = await Order.find({});
        res.json(product)



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const updatedOrder = req.body;
        const itemUpdated = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
       
        if (itemUpdated) {
            res.json(itemUpdated)

        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// router.delete('/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         const deletedProduct=await Cart.findByIdAndDelete(id);
//         if(deletedProduct){
//             res.send(deletedProduct);
//         }
      
       
    



//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });






module.exports = router