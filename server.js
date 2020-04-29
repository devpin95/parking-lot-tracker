var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();
module.exports = app; // for testing
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();

var lots = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0
};

router.get('/', function(req, res) {
    res.send(lots);
}).post('/movies', function(req, res) {

}).put('/movies', function(req, res) {

}).delete('/movies', function(req, res) {

});

app.use('/', router);
app.listen(process.env.PORT || 8080);
