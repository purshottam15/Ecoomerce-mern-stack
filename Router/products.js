const express = require('express');
const router = express.Router();
const Products = require('../models/products.js')




router.post('/', async (req, res) => {
    try {

        const product = await Products.create(req.body);
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
        let query = Products.find({});

        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
        }
        if (req.query.category) {
            query = query.where({ category: req.query.category });
        }
        if (req.query.brands) {
            query = query.where({ brands: req.query.brands });
        }
        if (req.query._page && req.query._limit) {
            const pageSize = Number(req.query._limit);
            const page = req.query._page
            query = query.skip(pageSize * (page - 1)).limit(pageSize)
        } 

        const allProducts = await query.exec();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const product = await Products.findById(id);
        res.json(product)



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const updatedProduct = req.body;
        const product = await Products.findByIdAndUpdate(id, updatedProduct, { new: true });
       
        if (product) {
            res.json(product)

        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const deletedProduct=await Products.findByIdAndDelete(id);
        if(deletedProduct){
            res.send(id);
        }
      
       
    



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






module.exports = router