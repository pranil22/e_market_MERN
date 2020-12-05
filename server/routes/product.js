const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');
const loginMiddleware = require('../middleware/requiredLogin');
var pdf = require("pdf-creator-node");
var fs = require('fs');
var html = fs.readFileSync('template.html', 'utf8');

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Payment Receipt</div>'
    }
};




router.get('/products', (req, res) => {
    Product
        .find()
        .sort({'createdAt': -1})
        .then((products) => {

            return res.status(200).json({
                products
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: "Something went wrong"
            });
        });
}); 


router.post('/products', loginMiddleware, (req, res) => {
    const { name, description, productImage, category, quantity, price } = req.body;

    if(!name || !description || !quantity || !price) {
        return res.status(422).json({
            error: "please add all the fields"
        });
    }

    if(name.trim() === "" || description.trim() === "") {
        return res.status(422).json({
            error: "please add all the fields"
        });
    }

    if(price === 0 || quantity === 0) {
        return res.status(422).json({
            error: "Price or Quantity cannot be zero"
        });
    }


    const newProduct = {
        name,
        description,
        price,
        quantity,
        category,
        seller: req.user._id
    };

    if(productImage) {
        newProduct.productImage = productImage;
    }

    console.log(productImage);

    const newProduct1 = new Product(newProduct);

    newProduct1
        .save()
        .then((result) => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: "Internal server error"
            })
        });
});


router.get("/products/:id", (req, res) => {

    console.log(req.params.id);

    Product.findOne({ _id: req.params.id })
        .then((product) => {
            if(!product) {

                return res.status(404).json({
                    error: "Product not found"
                });
            }
            else {
                return res.status(200).json({
                    product    
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: "Internal server error"
            })
        })
});

router.get('/search/:query', (req, res) => {
    let query = req.params.query;
    let patten = new RegExp(query, "i");

    Product.find({
        name: { $regex: patten }
    })
    .then((products) => {
        return res.status(200).json(products);
    })
    .catch((err) => {
        return res.status(500).json({ error: "database error" });
    })

});

router.post("/place-order", loginMiddleware, (req, res) => {
    
    const updateProduct = (id, selectedQty, currentQty) => {
        Product
            .updateOne({ _id: id }, { quantity: currentQty-selectedQty })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    console.log(req.body);
    let products = [];
    req.body.items.forEach((item) => {
        products.push({
            _id: item._id,
            selectedQty: item.selectedQty,
            currentQty: item.quantity
        });
    });

    let orders = [];
    req.body.items.forEach((item) => {
        orders.push({
            product: item._id,
            seller: item.seller,
            buyer: req.user._id
        });
    });

    products.forEach((product) => {
        updateProduct(product._id, product.selectedQty, product.currentQty);
    });

    Order.insertMany(orders)
        .then((data) => {
            var document = {
                html: html,
                data: {
                    items: req.body.items,
                    price: req.body.price,
                    name: req.user.name,
                    address: req.user.address,
                    email: req.user.email
                },
                path: "./documents/output.pdf"
            };


            pdf.create(document, options)
            .then(result => {
                console.log(req.user.name);
                console.log(req.user.address);
                console.log(result);
                return res.status(201).json(({
                    meassge: "Your order successfully placed"
                }));
            })
            .catch(error => {
                
                console.error(error);
                return res.status(500).json(({
                    error: "Internal server error"
                }));
            });
            
        });
});

router.get('/orders', (req, res) => {
    Order.find()
        .populate('seller.name seller.email')
        .exec()
        .then((data) => {
            return res.status(201).json(data);
        })
        .catch((err) => {
            return res.status(500).json({
                error: "Internal server error"
            });
        });
});


module.exports = router;