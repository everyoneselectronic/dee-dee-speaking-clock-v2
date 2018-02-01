// add requires
var express = require('express');
var router = express.Router();

var baseURL = "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/";
var endURL = ".wav]";

var svamlResponse;

router.post('/', function (req, res, next) {
    console.log("+" + req.body.cli);
    // add tell
    makeSvamlResponse();
    //send back the response.
    res.json(svamlResponse);
});
module.exports = router;


function makeAudioURL(a,u) {
    var URL = baseURL + u + endURL;
    a.push(URL);
};

function tellTime() {
    var audioIDs = new Array();

    var myDate = new Date();
    var myHour = myDate.getHours();
    var myMinute = myDate.getMinutes();
    var minuteDivBy5 = myMinute / 5;
    var roundMinuteDivBy5 = Math.round(minuteDivBy5);
    myHour = myHour % 12 || 12; // Convert hour to 12 hour day, 1-12

    // Array of speech, starting with intro. Further sounds will be added to the end.
    makeAudioURL(audioIDs,"intro");

    // If it's not on the hour...
    if (myMinute > 0) {

        // If not on a 5 min div, say "just left" or "coming up for"
        if (minuteDivBy5 != roundMinuteDivBy5) {
            if (roundMinuteDivBy5 < minuteDivBy5) {
                makeAudioURL(audioIDs,"justleft");
                // console.log("justleft")
            } else {
                makeAudioURL(audioIDs,"comingupfor");
                // console.log("comingupfor")
            }
        }

        // What minute? Past or from?
        if (roundMinuteDivBy5 == 6) { // if half past
            makeAudioURL(audioIDs,"half");
            makeAudioURL(audioIDs,"past");
            // console.log("half past");
        } else if (roundMinuteDivBy5 == 3) {
            makeAudioURL(audioIDs,"quarter");
            makeAudioURL(audioIDs,"past");
            // console.log("quarter past");
        } else if (roundMinuteDivBy5 == 9) {
            makeAudioURL(audioIDs,"quarter");
            makeAudioURL(audioIDs,"to");
            // console.log("quarter to");
        } else if (roundMinuteDivBy5 > 0 && roundMinuteDivBy5 < 7) {
            makeAudioURL(audioIDs,(roundMinuteDivBy5 * 5) + "m");
            makeAudioURL(audioIDs,"past");
            // console.log((roundMinuteDivBy5 * 5) + "m past");
        } else if (roundMinuteDivBy5 >= 7 && roundMinuteDivBy5 < 12) {
            makeAudioURL(audioIDs,(60 - (roundMinuteDivBy5 * 5)) + "m");
            makeAudioURL(audioIDs,"to");
            // console.log("etc");
        }

    }

    // What hour to say? If less than 33 mins, refer to this hour. More, refer to next hour.
    if (myMinute < 33) {
        makeAudioURL(audioIDs,myHour + "h");
        // console.log(myHour + "h");
    } else {
        if (myHour < 12) {
            makeAudioURL(audioIDs,myHour + 1 + "h");
            // console.log(myHour + 1 + "h");
        } else {
            makeAudioURL(audioIDs,"1h");
            // console.log("1h");
        }
    }
    
    makeAudioURL(audioIDs,"outro");
    
    // return IDs to response
    return audioIDs;
};

function makeSvamlResponse() {
    var aIDs = tellTime();

    svamlResponse = 
        {
            instructions: [
                {
                    "name" : "PlayFiles",
                    "ids" :  aIDs,
                    "locale" : "en-US"
                }
            ],
            action: {
                 "name" : "Hangup"
            }
        };
}