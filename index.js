// Web app (Express + EJS)
const https = require('https');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

// set the view engine to ejs
// app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/audio'));

// app.get('/',function(req,res){
  
// });

// app.listen(port, () => {
//     // will echo 'Our app is running on https://localhost:5000 when run locally'
//     console.log('Our app is running on https://localhost:' + port);
// });

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 https.get('https://dee-dee-speaking-clock-v2.herokuapp.com/');
}, 900000);


// var sinchApi = require('sinch-rest-api')({
//         key: '3078d38c-2e7c-47ca-8ae9-077642e6566a', 
//         secret: 'NWuxxRzx8UOT2v0qgRSwuA=='
//     }); 

// sinchApi.calling.placeCall({number: '+447708763203'});

    
// var baseUrl = "#href[https://dee-dee-speaking-clock-v2.herokuapp.com/";

// var responsedata = {
//     "Instructions": [],
//     "Action": {}
// };

// app.get('/',function(request,response){
//     var data = '';
    
//     request.on('data', function (chunk) {
//         data += chunk;

//     });

//     console.log(data);
    
//     request.on('end', function () {
//         var requestModel;
//         if (data == '')
//         {
//             response.sendFile('index.html');
//             response.end();
//             // response.writeHead(500, { 'Content-Type': 'application/json' });
//             // response.end('{"message":"no data posted"}');
//             // response.end('Call +44 20 3808 7032 for Limmy\'s Dee Dee Speaking Clock!');
//             return;
//         }
//         else
//         {
//             console.log(data);
//             requestModel = JSON.parse(data);
//             response.writeHead(200, { 'Content-Type': 'application/json' });
//             tellTime();
//             response.end(JSON.stringify(responsedata));
//         }
//     });

// });
// app.listen(port);

// function makeAudioObject(a) {
//     var str = baseUrl + a + ".wav]";
//     var ids = [str];

//     // console.log(ids);

//     var audio = {
//         "name" : "PlayFiles",
//         "ids" :  ids,
//         "locale" : "en-US"
//     }
//     responsedata['Instructions'].push(audio);
// }

// function tellTime() {
//     responsedata = {
//         "Instructions": [],
//         "Action": {}
//     };
    
//     var myDate = new Date();
//     var myHour = myDate.getHours();
//     var myMinute = myDate.getMinutes();
//     var minuteDivBy5 = myMinute / 5;
//     var roundMinuteDivBy5 = Math.round(minuteDivBy5);
//     myHour = myHour % 12 || 12; // Convert hour to 12 hour day, 1-12

//     // Array of speech, starting with intro. Further sounds will be added to the end.
//     makeAudioObject("intro");

//     // If it's not on the hour...
//     if (myMinute > 0) {

//         // If not on a 5 min div, say "just left" or "coming up for"
//         if (minuteDivBy5 != roundMinuteDivBy5) {
//             if (roundMinuteDivBy5 < minuteDivBy5) {
//                 makeAudioObject("justleft");
//                 // console.log("justleft")
//             } else {
//                 makeAudioObject("comingupfor");
//                 // console.log("comingupfor")
//             }
//         }

//         // What minute? Past or from?
//         if (roundMinuteDivBy5 == 6) { // if half past
//             makeAudioObject("half");
//             makeAudioObject("past");
//             // console.log("half past");
//         } else if (roundMinuteDivBy5 == 3) {
//             makeAudioObject("quarter");
//             makeAudioObject("past");
//             // console.log("quarter past");
//         } else if (roundMinuteDivBy5 == 9) {
//             makeAudioObject("quarter");
//             makeAudioObject("to");
//             // console.log("quarter to");
//         } else if (roundMinuteDivBy5 > 0 && roundMinuteDivBy5 < 7) {
//             makeAudioObject((roundMinuteDivBy5 * 5) + "m");
//             makeAudioObject("past");
//             // console.log((roundMinuteDivBy5 * 5) + "m past");
//         } else if (roundMinuteDivBy5 >= 7 && roundMinuteDivBy5 < 12) {
//             makeAudioObject((60 - (roundMinuteDivBy5 * 5)) + "m");
//             makeAudioObject("to");
//             // console.log("etc");
//         }

//     }

//     // What hour to say? If less than 33 mins, refer to this hour. More, refer to next hour.
//     if (myMinute < 33) {
//         makeAudioObject(myHour + "h");
//         // console.log(myHour + "h");
//     } else {
//         if (myHour < 12) {
//             makeAudioObject(myHour + 1 + "h");
//             // console.log(myHour + 1 + "h");
//         } else {
//             makeAudioObject("1h");
//             // console.log("1h");
//         }
//     }
// }