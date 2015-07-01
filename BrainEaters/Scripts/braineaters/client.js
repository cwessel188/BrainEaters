/// <reference path="jquery.signalr-2.1.2.min.js" />
(function () { 

    'use strict';
    // ******************************** SET UP ********************************

    var canvas = document.getElementById("game-canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";

    var scoretextarea = document.getElementById('score');
    var statustextarea = document.getElementById('status');
    
    const ZOMBIE_IMG = "../Content/images/Passive_Zombie.png";
    const FOOD_IMG = "../Content/images/mushroom.png";
    const PLR0_IMG = "../Content/images/pacman.png";
    const PLR1_IMG = "../Content/images/1.png";
    const PLR2_IMG = "../Content/images/2.png";
    const PLR3_IMG = "../Content/images/3.png";
    const PLR4_IMG = "../Content/images/4.png";
    const PLR5_IMG = "../Content/images/5.png";
    const PLR6_IMG = "../Content/images/6.png";
    const PLR7_IMG = "../Content/images/7.png";
    const PLR8_IMG = "../Content/images/8.png";
    const PLR9_IMG = "../Content/images/9.png";


    function entity(imgSrc) { // TODO Entity
        this.img = document.createElement('img');
        this.img.src = imgSrc;
    }

    // create the players
    for (var i = 0; i < 10; i++) {
        window["player" + i] = new entity("../Content/images/" + i + ".png");
    }


    // ******************************** SIGNALR HUB **********************************

    var playerName = prompt("Enter your name:", "Steve");

    // start hub
    var BEhub = $.connection.brainEatersHub;

    // start the connection
    $.connection.hub.start().done(function () {
        BEhub.server.addPlayer(playerName);

        // this syxtax works because I set tabindex="1" on the convas element
        $(canvas).keydown(function (e) {
            console.log(event.keyCode);
            BEhub.server.keyPressed(event.keyCode);
        });

    });

    // **************************** CLIENT PROPERTIES **********************************

    var CELL_WIDTH;
    var IMG_PADDING; // pixels
    var IMG_SIZE; // image height and width in pixels

    BEhub.client.setupGame = function (data) {
        console.log("Setup");
        CELL_WIDTH = data.CellWidth;
        IMG_PADDING = data.CellWidth / 10;
        IMG_SIZE = data.CellWidth - (2 * IMG_PADDING);
        canvas.height = data.CellWidth * data.NumberCellRows;
        canvas.width = data.CellWidth * data.NumberCellCols;
        canvas.style.visibility = "visible";

        drawGame(data);
    };

    BEhub.client.updateGame = function (data) {
        drawGame(data); 
    };

    BEhub.client.isDead = function () {
        alert("You've been eaten!");
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
            IMG_SIZE, IMG_SIZE)
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