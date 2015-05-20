
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
var scoretextarea = document.getElementById('score');
var statustextarea = document.getElementById('status');

const ZOMBIE_IMG = "../Content/images/Passive_Zombie.png";
const PLR_IMG = "../Content/images/pacman.png";
const FOOD_IMG = "../Content/images/mushroom.png";

function entity(imgSrc) { // copied from zombie
    this.img = document.createElement('img');
    this.img.src = imgSrc;
    this.width = 40;
    this.height = 40;
}

var zombie = new entity(ZOMBIE_IMG);
var steak = new entity(FOOD_IMG);
var player0 = new entity(PLR_IMG);

// **************************** SIGNALR HUB ******************************

// start hub
var BEhub = $.connection.brainEatersHub;

// start the connection
$.connection.hub.start().done(function () {
    BEhub.server.addPlayer('Steve');
    BEhub.server.requestGameState();

 // on keydown
    $(window).keydown(function (e) {
        console.log(event.keyCode);
        BEhub.server.keyPressed(event.keyCode);
    });

});

// *************************** UPDATE GAME *******************************

BEhub.client.updateGame = function (data) {
    console.log('Updating Game');
    drawGame(data);
};

// *************************** DRAW GAME *******************************

var drawGame = function (data) {

    for (var x in data.GameArray) {
        for (var y in data.GameArray[x]) {
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
        }
    }
};
// prompt user

// add user