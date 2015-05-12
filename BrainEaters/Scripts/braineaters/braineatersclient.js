



// ********************** START HUB *********************************************

// the signalR hub
var BEhub = $.connection.brainEatersHub;

// start the connection
$.connection.hub.start().done( function () {
    $(window).keydown(function (e) { // on keydown
        BEhub.server.keyPressed(event.keyCode);
    });
    $(window).requestAnimationFrame()
});

