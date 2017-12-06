var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var io = require('../server');

var PostProduct = require('./productSchema');


var PostPromotionSchema = new mongoose.Schema({
        produkty: Array,
        obnizka: Number,
        czasTrwania: Number
    },
    {collection: 'Promotions'}
);
var PostPromotion = mongoose.model('PostPromotion', PostPromotionSchema);

router.post('/promotions/', function(req, res) {
    PostPromotion.create({
        produkty: req.body.produkty,
        obnizka: req.body.obnizka,
        czasTrwania: req.body.czasTrwania
    }, function(err, promotion) {
        if (err) {
            res.send(err);
        }
        res.json(promotion);

        for (var i = 0; i < promotion.produkty.length; ++i) {
            PostProduct.findById(promotion.produkty[i], function(err, product) {
                if (err)
                    res.send(err);
                product.promocja += promotion.obnizka;
                product.save(function(err) {
                    if (err)
                        console.log(err);
                    console.log('product updated!');
                });

            });
        }

        io.sockets.emit('broadcast',{description: 'Nowa promocja jest dostępna, odśwież stronę'});

        setTimeout(function() {
            io.sockets.emit('broadcast',{description: 'Promocja wygasła, odśwież stronę'});
            for (var i = 0; i < promotion.produkty.length; ++i) {
                PostProduct.findById(promotion.produkty[i], function(err, product) {
                    if (err)
                        res.send(err);
                    product.promocja -= promotion.obnizka;
                    product.save(function(err) {
                        if (err)
                            console.log(err);
                        console.log('product updated!');
                    });

                });
            }
        }, promotion.czasTrwania*60*1000);
    });
});

module.exports = router;
