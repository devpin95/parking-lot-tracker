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
    A: {capacity: 0, filled: 0},
    B: {capacity: 0, filled: 0},
    C: {capacity: 0, filled: 0},
    D: {capacity: 0, filled: 0},
    E: {capacity: 0, filled: 0},
    F: {capacity: 0, filled: 0},
    G: {capacity: 0, filled: 0},
    H: {capacity: 0, filled: 0}
};

router.get('/lots', function(req, res) {
    res.send(lots);
}).put('/lots', function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query ) {

    }
});

app.use('/', router);
app.listen(process.env.PORT || 8080);