const router = require('express').Router();
let Product = require('../models/products.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err))
});

//ADD NEW EXERCISE
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const price = Number(req.body.price);
    const rating = Number(req.body.rating);
    const warranty_years = Number(req.body.warranty_years);
    const available = Boolean(req.body.available);

    const newProduct = new Product({
        name,
        type,
        price,
        rating,
        warranty_years,
        available
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

//FIND EXERCISE BY ID
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE EXERCISE
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//UPDATE EXERCISE
router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.type = req.body.type;
            product.price = Number(req.body.price);
            product.rating = Number(req.body.rating);
            product.warranty_years = Number(req.body.warranty_years);
            product.available = Boolean(req.body.available);

            product.save()
                .then(() => res.json('Product updated !'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
