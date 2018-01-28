
/*** Set up sinchClient ***/

sinchClient = new SinchClient({
    applicationKey: 'https://dee-dee-speaking-clock-v2.herokuapp.com/',
    capabilities: {calling: true},
    supportActiveConnection: true, /* NOTE: This is only required if application is to receive calls / instant messages. */ 
    //Note: For additional loging, please uncomment the three rows below
    onLogMessage: function(message) {
        console.log(message);
    },
});

/*** add your own mix stream***/
var audioCtx = new AudioContext();
var compressor = audioCtx.createDynamicsCompressor();
var song = audioCtx.createMediaElementSource($('audio#intro')[0]);
var destination = audioCtx.createMediaStreamDestination();
song.connect(compressor);
navigator.getUserMedia({video: false, audio: true}, function(stream) {
    var mic = audioCtx.createMediaStreamSource(stream);
    mic.connect(compressor);
    compressor.connect(destination);
    
}, function(error) {
        console.log(error);
});


/*** Define listener for managing calls ***/
CallClient callClient = sinchClient.getCallClient();

callClient.addEventListener({
    onIncomingCall: function(incomingCall) {
        //Play some groovy tunes & show UI
        $('audio#ringback').prop("currentTime", 0);
        $('audio#ringback').trigger("play");
        //Add event listeners to the new call object representing the incoming call
        incomingCall.addEventListener(callListeners);
    }
});


var callListeners = {
    onCallProgressing: function(call) {
        $('audio#ringback').prop("currentTime", 0);
        $('audio#ringback').trigger("play");
        $('div#callLog').append('<div id="stats">Ringing...</div>');
    },
    onCallEstablished: function(call) {
        $('audio#incoming').attr('src', call.incomingStreamURL);
        $('audio#ringback').trigger("pause");
        $('audio#song').trigger("play");
        //Report call stats
        var callDetails = call.getDetails();
        $('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime && new Date(callDetails.establishedTime))+'</div>');
    },
    onCallEnded: function(call) {
        $('audio#ringback').trigger("pause");
        $('audio#incoming').attr('src', '');
        $('audio#song').trigger("stop");
        $('button').removeClass('incall');
        $('input#phoneNumber').removeAttr('disabled');

        //Report call stats
        var callDetails = call.getDetails();
        $('div#callLog').append('<div id="stats">Ended: '+new Date(callDetails.endedTime)+'</div>');
        $('div#callLog').append('<div id="stats">Duration (s): '+callDetails.duration+'</div>');
        $('div#callLog').append('<div id="stats">End cause: '+call.getEndCause()+'</div>');
        if(call.error) {
            $('div#callLog').append('<div id="stats">Failure message: '+call.error.message+'</div>');
        }
    }
}

/*** Make a new PSTN call ***/

var callClient = sinchClient.getCallClient();
var call;


$('button#call').click(function(event) {
    event.preventDefault();

    if(!$(this).hasClass("incall")) {
        $('button').addClass('incall');
        $('input#phoneNumber').attr('disabled', 'disabled');
        call = callClient.callPhoneNumber($('input#phoneNumber').val(), {}, destination.stream);
        call.addEventListener(callListeners);
        $('div#callLog').append('<div id="title">Calling ' + $('input#phoneNumber').val()+'</div>');
        
        
    }
});

$('button#hangup').click(function(event) {
    event.preventDefault();

    if($(this).hasClass("incall")) {
        call && call.hangup();
    }
});


    //Stop the sinchClient
    sinchClient.stop();
    //Note: sinchClient object is now considered stale. Instantiate new sinchClient to reauthenticate, or reload the page.