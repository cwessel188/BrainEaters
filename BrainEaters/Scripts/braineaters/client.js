//'use strict';

var canvas = document.getElementById('gameCanvas');
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

function entity(imgSrc) {
    this.img = document.createElement('img');
    this.img.src = imgSrc;
    this.width = 40;
    this.height = 40;
}

var zombie = new entity(ZOMBIE_IMG);
var steak = new entity(FOOD_IMG);
// function facotry?
var player0 = new entity(PLR0_IMG);
var player1 = new entity(PLR1_IMG);
var player2 = new entity(PLR2_IMG);
var player3 = new entity(PLR3_IMG);
var player4 = new entity(PLR4_IMG);
var player5 = new entity(PLR5_IMG);
var player6 = new entity(PLR6_IMG);
var player7 = new entity(PLR7_IMG);
var player8 = new entity(PLR8_IMG);
var player9 = new entity(PLR9_IMG);



// **************************** SIGNALR HUB ******************************

// start hub
var BEhub = $.connection.brainEatersHub;



// start the connection
$.connection.hub.start().done(function () {
    BEhub.server.addPlayer('Steve');
    BEhub.server.requestGameState(); // probably not needed

    $(window).keydown(function (e) {
        console.log(event.keyCode);
        BEhub.server.keyPressed(event.keyCode);
    });

});

// called when the window closes
$(window).unload(function () {
    BEhub.server.testMethod();
})

$.connection.hub.disconnected(function () {
    console.log("stop function called");
    BEhub.server.testMethod();
});
// ************************* CLIENT PROPERTIES *****************************

BEhub.client.updateGame = function (data) {
    console.log('Updating Game');
    drawGame(data);
};

// *************************** DRAW GAME *******************************

var drawGame = function (data) {
    // TODO uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuugly
    for (var x in data.GameArray) {
        for (var y in data.GameArray[x]) {
            if (data.GameArray[x][y] == '-') {
                context.fillRect(data.CellWidth * x, data.CellWidth * y, data.CellWidth, data.CellWidth);
            }
            else if (data.GameArray[x][y] == '0') {
                context.drawImage(player0.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            // ugly but i'll refactor later
            else if (data.GameArray[x][y] == '1') {
                context.drawImage(player1.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            else if (data.GameArray[x][y] == '2') {
                context.drawImage(player2.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            else if (data.GameArray[x][y] == '3') {
                context.drawImage(player3.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            else if (data.GameArray[x][y] == '4') {
                context.drawImage(player4.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            else if (data.GameArray[x][y] == '5') {
                context.drawImage(player5.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }
            else if (data.GameArray[x][y] == '6') {
                context.drawImage(player6.img,
                    data.CellWidth * x, data.CellWidth * y,
                    player0.width, player0.height);
            }

        }
    }
};
// prompt user

// add user