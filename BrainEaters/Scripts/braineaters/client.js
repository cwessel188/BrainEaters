'use strict';

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
context.fillStyle = "#FFFFFF";

var scoretextarea = document.getElementById('score');
var statustextarea = document.getElementById('status');

const ZOMBIE_IMG = "../Content/images/Passive_Zombie.png";
const FOOD_IMG = "../Content/images/mushroom.png";
const PLR0_IMG = "../Content/images/pacman.png";
const PLR1_IMG = "../Content/images/mspacman.png";

function entity(imgSrc) {
    this.img = document.createElement('img');
    this.img.src = imgSrc;
    this.width = 40;
    this.height = 40;
}

var zombie = new entity(ZOMBIE_IMG);
var steak = new entity(FOOD_IMG);
var player0 = new entity(PLR0_IMG);
var player1 = new entity(PLR1_IMG);

// sets the client ID to a random number 0 <= n <= 9
// clientId = (Math.floor(Math.random() * 10));

// **************************** SIGNALR HUB ******************************

// start hub
var BEhub = $.connection.brainEatersHub;


// start the connection
$.connection.hub.start().done(function () {
    BEhub.server.addPlayer('Steve');
    BEhub.server.requestGameState(); // probably not needed

 // on keydown
    $(window).keydown(function (e) {
        console.log(event.keyCode);
        BEhub.server.keyPressed(event.keyCode);
    });

});

// *************************** CLIENT PROPERTIES *******************************

BEhub.client.updateGame = function (data) {
    console.log('Updating Game');
    drawGame(data);
};

// *************************** DRAW GAME *******************************

var drawGame = function (data) {

    for (var x in data.GameArray) {
        for (var y in data.GameArray[x]) {
            if (data.GameArray[x][y] == '-') {
                context.fillRect(data.CellWidth * x, data.CellWidth * y, data.CellWidth, data.CellWidth);
            }
            if (data.GameArray[x][y] == 'z') {
               // console.log(data);
                context.drawImage(zombie.img,
                    data.CellWidth * x, data.CellWidth * y, // coordinates
                    zombie.width, zombie.height);
            }
            if (data.GameArray[x][y] == 'f') {
                context.drawImage(steak.img,
                    data.CellWidth * x, data.CellWidth * y,
                    steak.width, steak.height);
            }
            if (data.GameArray[x][y] == '0') {
                context.drawImage(player0.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            if (data.GameArray[x][y] == '1') {
                context.drawImage(player1.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player1.width, player1.height);
            }
        }
    }
};
// prompt user

// add user