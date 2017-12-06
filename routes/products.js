var express = require('express');
var router = express.Router();


var Product = require('./producctSchema');

var PostProduct = require('./productSchema');

router.get('/products/min/:min/max/:max/', function(req, res) {
    if (req.query.hasOwnProperty('min')) {
        if (!req.query.hasOwnProperty('cena')) {
            req.query.cena = {};
        }

        req.query.cena.$gte = req.query.min;
        delete req.query.min;
    }
    if (req.query.hasOwnProperty('max')) {
        if (!req.query.hasOwnProperty('cena')) {
            req.query.cena = {};
        }

        req.query.cena.$lte = req.query.max;
        delete req.query.max;
    }
    if (req.query.hasOwnProperty('kategoria')) {
        var kat = req.query.kategoria;
        if (Array.isArray(kat)) {
            req.query.kategoria = {};
            req.query.kategoria.$in = [];
            kat.forEach(function (t) {
                req.query.kategoria.$in.push(t);
            });
        }
    }
    if (req.query.hasOwnProperty('filtr')) {
        req.query.nazwa = new RegExp(req.query.filtr, "i");
        delete req.query.filtr;
    }
    console.log(req.query)
    Product.find(req.query, function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
});

router.get('/products/:product_id', function(req, res) {
    PostProduct.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
});

router.get('/kategorie', function(req, res) {
    Product.distinct('kategoria', function(err, kategorie) {
        if (err)
            res.send(err);
        res.json(kategorie);
    });
});

router.get('/products/', function(req, res) {
    Product.find(function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
});

router.post('/products/', function(req, res) {
    PostProduct.create({
        nazwa: req.body.nazwa,
        opis: req.body.opis,
        cena: req.body.cena,
        kategoria: req.body.kategoria,
        promocja: 0,
        zdjecie: req.body.zdjecie
    }, function(err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

router.delete('/products/:product_id', function(req, res) {
    PostProduct.findByIdAndRemove(req.params.product_id, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    })
});

router.put('/products/:product_id', function (req, res) {
    PostProduct.findById(req.params.product_id, function(err, product) {
        if (err)
            res.send(err);

        product.name = req.body.name;
        product.opis = req.body.opis;
        product.cena = req.body.cena;
        product.kategoria = req.body.kategoria;
        product.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'product updated!'});
        });

    });
});

module.exports = router;
