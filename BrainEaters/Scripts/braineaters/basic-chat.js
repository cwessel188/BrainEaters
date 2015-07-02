// reference DOM elements
var frm = document.getElementById('chat-form');
var messageInput = document.getElementById('input');
var messageList = document.getElementById('message-list');
var chatWindow = document.getElementById('chat-window');


// make sure windows scrolls to last message
chatWindow.scrollTop = chatWindow.scrollHeight;

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
chat.client.postMessage = function (player, message) {
    messageList.innerHTML+= '<li>' + 
        '<span class="from" style="color:' + player.Color + '">' + player.Name + ": </span>" +
        message + '</li>';


    // make sure windows scrolls to last message
    chatWindow.scrollTop = chatWindow.scrollHeight; 
};

// comments
chat.client.postServerMessage = function (message) {
    messageList.innerHTML += '<li>' + message + '</li>';
};