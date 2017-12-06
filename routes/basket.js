var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var BasketSchema = new mongoose.Schema({
        _id: String,
        login: String,
        iloscWKoszyku: Number,
        sumaWartosci: Number,
        produktyWKoszyku: Array
    },
    {collection: 'Baskets'}
);

var Basket = mongoose.model('Basket', BasketSchema);
var PostBasket = require('./basketSchema');
var PostProduct = require('./productSchema');

router.put('/baskets', function(req, res) {
    if (PostBasket.findOne({login: req.query.login})) {
        PostBasket.findOne({login: req.query.login}, function(err, basket) {
            if (err)
                res.send(err);

            basket.iloscWKoszyku = req.body.iloscWKoszyku;
            basket.sumaWartosci = req.body.sumaWartosci;
            basket.produktyWKoszyku = req.body.produktyWKoszyku;
            basket.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'basket updated!'});
            });
        });
    }
});

router.get('/baskets', function(req, res) {
    PostBasket.findOne({login: req.query.login} , function(err, basket) {
        if (err)
            res.send(err);
        if (!basket) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (basket) {
            res.json(basket);
        }
    });
});

module.exports = router;
