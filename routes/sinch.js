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
                "ids" :  [ 
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/1h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/2h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/3h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/4h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/5h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/6h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/7h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/8h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/9h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/10h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/11h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/12h.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/5m.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/10m.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/20m.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/25m.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/comingupfor.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/half.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/intro.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/justleft.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/past.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/quarter.wav]",
                    "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/to.wav]"
                ],
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