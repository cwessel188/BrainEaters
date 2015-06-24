// reference DOM elements
var frm = document.getElementById('frm');
var messageInput = document.getElementById('input');
var messageList = document.getElementById('chat-messages');

// reference hub
var chat = $.connection.brainEatersHub;

// start the WebSocket connection
$.connection.hub.start().done(function () {
    // add listener for message form submit
    frm.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent form from submitting
        chat.server.sendMessage(messageInput.value); // send message to server
        messageInput.value = ""; // clear input
    });
});

// when server calls us, show messages from other users
chat.client.sendMessage = function (callerName, message) {
    messageList.innerHTML+= '<li><strong>' + callerName + ":  </strong>" + message + '</li>';
};