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
    A: {capacity: 20, filled: 0},
    B: {capacity: 55, filled: 0},
    C: {capacity: 35, filled: 0},
    D: {capacity: 61, filled: 0},
    E: {capacity: 92, filled: 0},
    F: {capacity: 44, filled: 0},
    G: {capacity: 13, filled: 0},
    H: {capacity: 86, filled: 0}
};

router.get('/lots', function(req, res) {
    res.send(lots);
}).put('/lots', function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query && query.hasOwnProperty("lot") ) {
        if ( query.hasOwnProperty("add") ) {
            lots[query.lot].filled += parseInt(query.add);
            res.status = 400;
            res.send({status: 200, message: "Added " + query.add + " to lot " + query.lot});
        }
        else if (query.hasOwnProperty("fill"))
            var fill = parseInt(query.fill);

            if ( fill <= lots[query.lot].capacity ) {
                lots[query.lot].filled = parseInt(query.fill);
                res.send({status: 200, message: "Set lot " + query.lot + " to " + query.fill});
            } else {
                res.status = 400;
                res.send({status: 400, message: "value over lot capacity"});
            }
        }
        else if (query.hasOwnProperty("capacity")) {
            lots[query.lot].capacity = parseInt(query.capacity);
            res.send({status: 200, message: "Set lot " + query.lot + " capacity to " + query.capacity});
        }
    } else {
        res.status = 400;
        res.send({status: 400, message: "Must have query paramemter with specified lot and action"});
    }
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
