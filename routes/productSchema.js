var mongoose = require('mongoose');

var PostProductSchema = new mongoose.Schema({
        nazwa: String,
        opis: String,
        cena: Number,
        kategoria: String,
        promocja: Number,
        zdjecie: Array
    },
    {collection: 'Products'}
);

var PostProduct = mongoose.model('PostProduct', PostProductSchema);

module.exports = PostProduct;
