var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var PostOrderSchema = new mongoose.Schema({
        login: String,
        adres: String,
        imie: String,
        nazwisko: String,
        wartosc: Number,
        zrealizowane: Boolean,
        produkty: Array
    },
    {collection: 'Orders'}
);
var PostOrder = mongoose.model('PostOrder', PostOrderSchema);

router.post('/orders/', function(req, res) {
    PostOrder.create({
        adres : req.body.adres,
        login: req.body.login,
        imie : req.body.imie,
        nazwisko: req.body.nazwisko,
        wartosc: req.body.wartosc,
        zrealizowane: req.body.zrealizowane,
        produkty: req.body.produkty
    }, function(err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

module.exports = router;
