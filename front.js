var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'SklepInternetowy/dist')));

app.get('*', function(req, res, next) {
    res.status(200).sendFile(path.join(__dirname,'SklepInternetowy/dist/index.html'));
});

module.exports = app;