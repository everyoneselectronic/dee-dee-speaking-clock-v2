// Discord.js bot
// const Discord = require('discord.js');
// const client = new Discord.Client();

// client.on('ready', () => {
//     client.user.setGame('https://git.io/d.js-heroku');
// });

// client.on('message', msg => {
//     if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
//     const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
//     const args = msg.content.split(' ').slice(1).join(' ');
//     if (command === 'guide') return msg.channel.send('https://git.io/d.js-heroku');
//     else if (command === 'invite') return msg.channel.send(process.env.INVITE);
// });

// client.login(process.env.TOKEN);

// Sinch app
// var SinchClient = require('sinch-rtc');

// var sinchClient = new SinchClient({
//     applicationKey: '4c11bcda-d3c8-4fa5-ab03-31bab8e43f4e',
//     capabilities: {calling: true},
//     //supportActiveConnection: true,
// });

// callClient.addEventListener({
//     onIncomingCall: function(incomingCall) {
//         //Play some groovy tunes & show UI
//         ...
//         //Add event listeners to the new call object representing the incoming call
//         incomingCall.addEventListener(callListeners);
//     }
// });


// var callListeners = {
//     onCallProgressing: function(call) {
//         $('audio#ringback').prop("currentTime",0); //Ensure ringback start from beginning
//         $('audio#ringback').trigger("play"); //Play ringback when call is progressing
//     },
//     onCallEstablished: function(call) {
//         $('audio#ringback').trigger("pause"); //End ringback
//         $('audio#incoming').attr('src', call.incomingStreamURL); //Connect incoming stream to audio element
//     },
//     onCallEnded: function(call) {
//         $('audio#ringback').trigger("pause"); //End the ringback
//         $('audio#incoming').attr('src', ''); //Ensure no incoming stream is playing
//         //Optional: Enable user interface to make another call
//     }
// }


// Web app (Express + EJS)
const http = require('http');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('https://dee-dee-speaking-clock-v2.herokuapp.com/');
}, 900000);


function makeAudioObject(a) {
    var str = baseUrl + a + ".wav]";
    var ids = [str];

    // console.log(ids);

    var audio = {
        "name" : "PlayFiles",
        "ids" :  ids,
        "locale" : "en-US"
    }
    responsedata['Instructions'].push(audio);
}

function tellTime() {
    responsedata = {
        "Instructions": [],
        "Action": {}
    };
    
    var myDate = new Date();
    var myHour = myDate.getHours();
    var myMinute = myDate.getMinutes();
    var minuteDivBy5 = myMinute / 5;
    var roundMinuteDivBy5 = Math.round(minuteDivBy5);
    myHour = myHour % 12 || 12; // Convert hour to 12 hour day, 1-12

    // Array of speech, starting with intro. Further sounds will be added to the end.
    makeAudioObject("intro");

    // If it's not on the hour...
    if (myMinute > 0) {

        // If not on a 5 min div, say "just left" or "coming up for"
        if (minuteDivBy5 != roundMinuteDivBy5) {
            if (roundMinuteDivBy5 < minuteDivBy5) {
                makeAudioObject("justleft");
                // console.log("justleft")
            } else {
                makeAudioObject("comingupfor");
                // console.log("comingupfor")
            }
        }

        // What minute? Past or from?
        if (roundMinuteDivBy5 == 6) { // if half past
            makeAudioObject("half");
            makeAudioObject("past");
            // console.log("half past");
        } else if (roundMinuteDivBy5 == 3) {
            makeAudioObject("quarter");
            makeAudioObject("past");
            // console.log("quarter past");
        } else if (roundMinuteDivBy5 == 9) {
            makeAudioObject("quarter");
            makeAudioObject("to");
            // console.log("quarter to");
        } else if (roundMinuteDivBy5 > 0 && roundMinuteDivBy5 < 7) {
            makeAudioObject((roundMinuteDivBy5 * 5) + "m");
            makeAudioObject("past");
            // console.log((roundMinuteDivBy5 * 5) + "m past");
        } else if (roundMinuteDivBy5 >= 7 && roundMinuteDivBy5 < 12) {
            makeAudioObject((60 - (roundMinuteDivBy5 * 5)) + "m");
            makeAudioObject("to");
            // console.log("etc");
        }

    }

    // What hour to say? If less than 33 mins, refer to this hour. More, refer to next hour.
    if (myMinute < 33) {
        makeAudioObject(myHour + "h");
        // console.log(myHour + "h");
    } else {
        if (myHour < 12) {
            makeAudioObject(myHour + 1 + "h");
            // console.log(myHour + 1 + "h");
        } else {
            makeAudioObject("1h");
            // console.log("1h");
        }
    }
}