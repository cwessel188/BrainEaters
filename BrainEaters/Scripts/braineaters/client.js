﻿/// <reference path="jquery.signalr-2.1.2.min.js" />
'use strict';
// ******************************** SET UP ********************************

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
context.fillStyle = "#FFFFFF";

var scoretextarea = document.getElementById('score');
var statustextarea = document.getElementById('status');

const IMG_SIZE = 40; // image height and width in pixels
const IMG_PADDING = 5; // pixels

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

BEhub.client.updateGame = function (data) {
    console.log('Updating Game');
    drawGame(data);
};

BEhub.client.isDead = function () {
    alert("You've been eaten!");
};

// ********************************* DRAW GAME ************************************

var drawGame = function (data) {
    for (let x in data.GameArray) {
        for (let y in data.GameArray[x]) {
            switch (data.GameArray[x][y]) {
                case "-":
                    context.fillStyle = "#FFFFFF";
                    context.fillRect(data.CellWidth * x, data.CellWidth * y, data.CellWidth, data.CellWidth);
                    break;
                case ("0"): // 0 is falsey and must be handled seperately
                    // drawPlayerAsImage(0, x, y, data.CellWidth);
                    drawPlayerAsColor(data, 0, x, y, data.CellWidth)
                    break;
                default:
                    if (parseInt(data.GameArray[x][y], 10)) { // it's a number
                        // drawPlayerAsImage(parseInt(data.GameArray[x][y], 10), x, y, data.CellWidth);
                        drawPlayerAsColor(data, parseInt(data.GameArray[x][y], 10), x, y, data.CellWidth);
                    }
                    else {
                        console.log("Error in drawPlayer: char not recognized" + data.GameArray[x][y]);
                    }
            }
        }  // for x
    }      // for y
};         // draw game

var drawPlayerAsImage = function (plrNumber, x, y, cellWidth) {
    context.drawImage(
        window["player" + plrNumber].img,
        cellWidth * x + IMG_PADDING, cellWidth * y + IMG_PADDING,
        IMG_SIZE, IMG_SIZE);
};

var drawPlayerAsColor = function (data, plrNumber, x, y, cellWidth) {
    context.fillStyle = data.Players[plrNumber].Color;
    context.fillRect(cellWidth * x + IMG_PADDING, cellWidth * y + IMG_PADDING, // coors
        IMG_SIZE, IMG_SIZE); // size
};
