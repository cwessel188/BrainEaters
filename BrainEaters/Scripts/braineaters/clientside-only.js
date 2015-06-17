/// <reference path="../jquery-1.10.2.min.js" />

/*
this version fo the game does NOT use signal r at all. 
it is contained within a single page and intended for use as a reference
*/

'use strict';

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
var scoretextarea = document.getElementById('score');
var statustextarea = document.getElementById('status');


var CELL_INTERVAL = 50; // width of the cells.
var PICTURE_SIZE = 40;  // size (in px) of each square picture
var OFFSET = 5;         // how far from the edge of the cells the picture should be.
var NUM_ZOMBIES = 10;   // num zombies to start with
var NUM_FOOD = 10;   // num zombies to start with

// *********************************** INITIALIZATIONS ************************************

// steve!
function hero() {
    this.img = document.createElement('img');
    this.img.src = "../Content/images/pacman.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    this.img.style.x = OFFSET; // coordinates
    this.img.style.y = OFFSET;
    this.score = 0;
    this.deaths = 0;
    // TODO copied from zombie. feels wet. i want a class.
    this.moveLeft = function () {
        var xpos = parseInt(this.img.style.x);
        if (xpos > CELL_INTERVAL) {
            this.img.style.x = xpos - CELL_INTERVAL + 'px';
        }
    }
    this.moveRight = function () {
        var xpos = parseInt(this.img.style.x);
        if (xpos < canvas.clientWidth - CELL_INTERVAL) {
            this.img.style.x = xpos + CELL_INTERVAL + 'px';
        }
    }
    this.moveUp = function () {
        var ypos = parseInt(this.img.style.y);
        if (ypos > CELL_INTERVAL) {
            this.img.style.y = ypos - CELL_INTERVAL + 'px';
        }
    }
    this.moveDown = function () {
        var ypos = parseInt(this.img.style.y);
        if (ypos < canvas.clientHeight - CELL_INTERVAL) {
            this.img.style.y = ypos + CELL_INTERVAL + 'px';
        }
    }
}

// zombies!
function zombie() {
    this.img = document.createElement('img');
    this.img.src = "../Content/images/Passive_Zombie.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    // make coordinates random                  numCells
    this.img.style.x = OFFSET + parseInt(Math.random() * (canvas.clientWidth / CELL_INTERVAL)) * 50;
    this.img.style.y = OFFSET + parseInt(Math.random() * (canvas.clientHeight / CELL_INTERVAL)) * 50;
    // moving functions
    this.moveLeft = function () {
        var xpos = parseInt(this.img.style.x);
        if (xpos > CELL_INTERVAL) {
            this.img.style.x = xpos - CELL_INTERVAL + 'px';
        }
    }
    this.moveRight = function () {
        var xpos = parseInt(this.img.style.x);
        if (xpos < canvas.clientWidth - CELL_INTERVAL) {
            this.img.style.x = xpos + CELL_INTERVAL + 'px';
        }
    }
    this.moveUp = function () {
        var ypos = parseInt(this.img.style.y);
        if (ypos > CELL_INTERVAL) {
            this.img.style.y = ypos - CELL_INTERVAL + 'px';
        }
    }
    this.moveDown = function () {
        var ypos = parseInt(this.img.style.y);
        if (ypos < canvas.clientHeight - CELL_INTERVAL) {
            this.img.style.y = ypos + CELL_INTERVAL + 'px';
        }
    }
}

// Food!
function steak() { // copied from zombie
    this.img = document.createElement('img');
    this.img.src = "../Content/images/mushroom.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    // make coordinates random                  numCells
    this.img.style.x = OFFSET + parseInt(Math.random() * (canvas.clientWidth / CELL_INTERVAL)) * 50;
    this.img.style.y = OFFSET + parseInt(Math.random() * (canvas.clientHeight / CELL_INTERVAL)) * 50;
}

var steve = new hero();

var zombies = [];
for (var i = 0; i < NUM_ZOMBIES; i++) {
    zombies.push(new zombie());
}

var food = [];
for (var i = 0; i < NUM_FOOD; i++) {
    food.push(new steak());
}

// make a unifying array for all the entities
var entities = [];
food.forEach( function (i) {
    entities.push(i);
});
zombies.forEach( function (i) {
    entities.push(i);
});
entities.push(steve);



// *************************************** MULTIPLAYER **************************************

/*
// the signalR hub
var BEhub = $.connection.brainEatersHub;

BEhub.client.keyPressed = keyPressed;
// start the connection
$.connection.hub.start().done( function () {
    $(window).keydown(function (e) { // on keydown
        console.log(`${event.keyCode} pressed, called hub`);
    BEhub.server.keyPressed(event.keyCode);
});
*/



// *******************************************GAME FUNCTIONS**********************************************

$(window).keydown(function (e) {  // on keydown
    keyPressed(event.keyCode);
    console.log(event.keyCode + ' pressed, called from client');
});



function keyPressed (keyCode) {
    console.log(`keyPressed reached with code ${keyCode}`);
switch (keyCode) {
    // short circuiting prevents using (65 || 37)
    case 65: // A or left
    case 37:
        steve.moveLeft();
        break;
    case 68: // D or right
    case 39:
        steve.moveRight();
        break;
    case 87: // W or up
    case 38:
        steve.moveUp();
        break;
    case 83: // S or down
    case 40:
        steve.moveDown();
        break;
}
} // ignore syntax error here

// *******************************************DRAW and UPDATE**************************************************
var foodCount = NUM_FOOD;
var mainloop = function () {
    drawGame();
    updateGame(entities)
    if (!foodCount) {
        scoretextarea.innerHTML = "You've won!";
    } 
    else {
        window.requestAnimationFrame(mainloop);
    }
};
if (foodCount) {
    window.requestAnimationFrame(mainloop);
}
var updateGame = function (sprites) {

    sprites.forEach(function (i) {
        if (i instanceof zombie) {
            if ((steve.img.style.x == i.img.style.x) && (steve.img.style.y == i.img.style.y)) {
                // reset steve
                steve.img.style.x = OFFSET;
                steve.img.style.y = OFFSET;
                steve.deaths++;
            }
        }
        else if (i instanceof steak) { 
            if ((steve.img.style.x == i.img.style.x) && (steve.img.style.y == i.img.style.y)) {
                var index = sprites.indexOf(i);
                sprites.splice(index, 1);
                foodCount--;
                steve.score++;
            }
        }
    });


    // move zombies!
    sprites.forEach(function (z) {
        if (z instanceof zombie) {
            if (Math.random() < .01) { // move approx 1 out of 100 frames
                switch (Math.floor(Math.random() * 4)) {
                    case 0:
                        z.moveLeft();
                        break;
                    case 1:
                        z.moveRight();
                        break;
                    case 2:
                        z.moveUp();
                        break;
                    case 3:
                        z.moveDown();
                        break;
                }
            }
        }
   
    });
    // update text areas
    scoretextarea.innerHTML =  `Steve's Score: ${steve.score}</br>`;
        
    // TODO is there a way to change innerHTML without overwriting it?
    statustextarea.innerHTML = `Steve's Deaths: ${steve.deaths}`;

};

var drawGame = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach(function (f) {
        context.drawImage(f.img, parseInt(f.img.style.x), parseInt(f.img.style.y), f.width, f.height);
    });
   
};

// TODO Sprites!
// zombie sprite dimensions: 32 x 48 