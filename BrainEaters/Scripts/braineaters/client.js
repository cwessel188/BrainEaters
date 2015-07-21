/// <reference path="jquery.signalr-2.1.2.min.js" />
(function () {

    'use strict';
    // ******************************** SET UP ********************************


    // this is how you'd inject a canvas using JQuery. I'm using the CSS display:none instead.
    // $("#canvas-div").append('<canvas id="new"></canvas>');

    var canvas = document.getElementById("game-canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";

    var frm = document.getElementById('chat-form');
    var messageInput = document.getElementById('input');
    var messageListDiv = document.getElementById('chat-messages');
    var messageList = document.getElementById('chat-message-list');

    var BEhub = $.connection.brainEatersHub;

    var CELL_WIDTH;
    var IMG_PADDING; // pixels
    var IMG_SIZE;    // image height and width in pixels

    function entity(imgSrc) { // TODO Entity
        this.img = document.createElement('img');
        this.img.src = imgSrc;
    }

    // create the players
    for (var i = 0; i < 10; i++) {
        window["player" + i] = new entity("../Content/images/" + i + ".png");
    }


    var playerName, playerColor;
    // old, crappy way of prompting a user's name
    // playerName = prompt("Enter your name:", "Steve");

    // new sleek way to get name
    $("#login-frm").submit(function (e) {
        e.preventDefault();
        playerName = this.name.value;
        playerColor = this.color.value;

        // ******************************** SIGNALR HUB **********************************

        // start the connection
        $.connection.hub.start().done(function () {
            BEhub.server.addPlayer(playerName, playerColor);

            // this syxtax works because I set tabindex="1" on the canvas element
            $(canvas).keydown(function (e) {
                console.log(e.keyCode);
                BEhub.server.keyPressed(e.keyCode);
            });
            // add listener for message form submit
            frm.addEventListener('submit', function (e) {
                e.preventDefault(); // prevent form from submitting
                BEhub.server.sendMessage(messageInput.value); // send message to server
                messageInput.value = ""; // clear input
            });
        });

        $("#login-frm").hide();

    }); // submit


    // **************************** CLIENT PROPERTIES **********************************

    BEhub.client.setupGame = function (data) {
        console.log("Setup");
        CELL_WIDTH = data.CellWidth;
        IMG_PADDING = data.CellWidth / 10;
        IMG_SIZE = data.CellWidth - (2 * IMG_PADDING);
        canvas.height = data.CellWidth * data.NumberCellRows;
        canvas.width = data.CellWidth * data.NumberCellCols;
        $(canvas).show();

        drawGame(data);
    };

    BEhub.client.updateGame = function (data) {
        drawGame(data);
    };

    // when server calls us, show messages from other users
    BEhub.client.postMessage = function (player, message) {
        messageList.innerHTML += '<li>' +
            '<span class="from" style="color:' + player.Color + '">' + player.Name + ": </span>" +
            message + '</li>';


        // make sure windows scrolls to last message
        messageListDiv.scrollTop = messageListDiv.scrollHeight;
    };


    BEhub.client.postServerMessage = function (message) {
        messageList.innerHTML += '<li>' + message + '</li>';
    };

    // ********************************* DRAW GAME ************************************

    var drawGame = function (data) {
        // fill with white
        context.fillStyle = "#FFFFFF"
        context.fillRect(0, 0, data.CellWidth * data.NumberCellCols, data.CellWidth * data.NumberCellRows)
        // draw players
        data.Players.forEach(drawPlayerAsColor);
        // highlight a player
        context.fillStyle = "#000000";
        context.beginPath();
        context.rect(CELL_WIDTH * data.HighlightedPlayer.Xcoor, CELL_WIDTH * data.HighlightedPlayer.Ycoor, // coors
            IMG_SIZE + 2 * IMG_PADDING, IMG_SIZE + 2 * IMG_PADDING);
        context.stroke();
    };         // draw game

    var drawPlayerAsImage = function (plrNumber, x, y, cellWidth) {
        context.drawImage(
            window["player" + plrNumber].img,
            cellWidth * x + IMG_PADDING, cellWidth * y + IMG_PADDING,
            IMG_SIZE, IMG_SIZE);
    };

    var drawPlayerAsColor = function (element, index, array) {
        context.fillStyle = element.Color;
        context.fillRect(CELL_WIDTH * element.Xcoor + IMG_PADDING, CELL_WIDTH * element.Ycoor + IMG_PADDING, // coors
            IMG_SIZE, IMG_SIZE); // size
    };

})();