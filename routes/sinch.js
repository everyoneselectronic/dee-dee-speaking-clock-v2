// add requires
var express = require('express');
var router = express.Router();

var svamlResponse =
    {
        instructions: [
            {
                "name": "Say",
                "text": "The Limmy Clock is undergoing maintenance",
                "locale": "en-US"
            },
            {
                "name" : "PlayFiles",
                "ids" :  [ "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/2h.wav","#href[https://dee-dee-speaking-clock-v2.herokuapp.com/2h.wav" ],
                "locale" : "en-US"
            }
        ],
        action: {
             "name" : "Hangup"
        }
    };

router.post('/', function (req, res, next) {
    //we know its a ICE event since we supress callbacks for other events
    // set the callerid to the calling number
    // svamlResponse.action.cli = req.body.cli;
    //send back the response.
    res.json(svamlResponse);
});
module.exports = router;