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
    D: {capacity: 61, filled: 0}
};

var actions_test = {
    input: "666",
    toggle: true,
    high: true
};

router.get('/lots', function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query ) {
        if ( query.hasOwnProperty("lot") ) {
            switch ( query.lot ) {
                case 'A': case 'a': res.send({status: 200, value: lots[query.lot].filled}); break;
                case 'B': case 'b': res.send({status: 200, value: lots[query.lot].filled}); break;
                case 'C': case 'c': res.send({status: 200, value: lots[query.lot].filled}); break;
                case 'D': case 'd': res.send({status: 200, value: lots[query.lot].filled}); break;
                default: res.send({status: 404, message: "Lot not found"});
            }
        }
    } else {
        res.send(lots);
    }
}).get('/lots/state', function(req, res) {
    /*
        {
            "monitors": {
                "lot_a": "STRING | NUMBER | BOOLEAN",
                "lot_b": "STRING | NUMBER | BOOLEAN",
                "lot_c": "STRING | NUMBER | BOOLEAN",
                "lot_d": "STRING | NUMBER | BOOLEAN"
            },
            "actions": {
                "test_input_number": "STRING",
                "test_toggle": "BOOLEAN"
            }
        }
     */
    var json = {monitors: {}, actions: {test_input_number: actions_test.input, test_toggle: actions_test.toggle}};
    json.monitors.lot_a = lots.A.filled;
    json.monitors.lot_b = lots.B.filled;
    json.monitors.lot_c = lots.C.filled;
    json.monitors.lot_d = lots.D.filled;
    res.send(json);
}).put('/lots', function(req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query && query.hasOwnProperty("lot") ) {
        if ( query.hasOwnProperty("add") ) {
            lots[query.lot].filled += parseInt(query.add);
            res.status = 400;
            res.send({status: 200, message: "Added " + query.add + " to lot " + query.lot});
        }
        else if (query.hasOwnProperty("fill")) {
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
}).post('/button', function(req, res) {
    res.send({status: 200, message: "Button pressed"});
}).post('/toggle', function (req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query.hasOwnProperty(("state")) ) {
        actions_test.toggle = query.state === "true";
    }

    res.send({status: 200, message: "Toggle updated"});
}).post('/input', function (req, res) {
    actions_test.input = req.body.value;
    res.json({status: 200, value: req.body.value});
}).post('/high', function (req, res) {
    var query = Object.keys(req.query).length === 0 ? null : req.query;

    if ( query.hasOwnProperty(("state")) ) {
        actions_test.high = query.state === "true";
    }

    res.send({status: 200, message: "Toggle updated"});
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
