/// <reference path="../jquery-1.10.2.min.js" />

/*
this version of the game does NOT use signal r at all. 
it is contained within a single page and intended for use as a reference
*/

'use strict';

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
var scoretextarea = document.getElementById('score');
var statustextarea = document.getElementById('status');


const CELL_INTERVAL = 50; // width of the cells.
const PICTURE_SIZE = 40;  // size (in px) of each square picture
const OFFSET = 5;         // how far from the edge of the cells the picture should be.
const NUM_ZOMBIES = 15;   // num zombies to start with
const ZOMBIE_SPEED = .05; // moves per frame
const NUM_FOOD = 10;      // num zombies to start with

// *********************************** INITIALIZATIONS ************************************

// steve!
function hero() {
    this.img = document.createElement('img');
    this.img.src = "../Content/images/pacman.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    this.x = OFFSET; // coordinates
    this.y = OFFSET;
    this.score = 0;
    this.deaths = 0;
    // TODO copied from zombie. feels wet. i want a class.
    this.moveLeft = function () {
        var xpos = parseInt(this.x);
        if (xpos > CELL_INTERVAL) {
            this.x = xpos - CELL_INTERVAL;
        }
    }
    this.moveRight = function () {
        var xpos = parseInt(this.x);
        if (xpos < canvas.clientWidth - CELL_INTERVAL) {
            this.x = xpos + CELL_INTERVAL;
        }
    }
    this.moveUp = function () {
        var ypos = parseInt(this.y);
        if (ypos > CELL_INTERVAL) {
            this.y = ypos - CELL_INTERVAL;
        }
    }
    this.moveDown = function () {
        var ypos = parseInt(this.y);
        if (ypos < canvas.clientHeight - CELL_INTERVAL) {
            this.y = ypos + CELL_INTERVAL;
        }
    }
}

// zombies!
function zombie() {
    this.img = document.createElement('img');
    this.img.src = "../Content/images/Passive_Zombie.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    // make coordinates random                             numCells
    this.x = OFFSET + parseInt(Math.random() * (canvas.clientWidth / CELL_INTERVAL)) * 50;
    this.y = OFFSET + parseInt(Math.random() * (canvas.clientHeight / CELL_INTERVAL)) * 50;
    // moving functions
    this.moveLeft = function () {
        var xpos = this.x;
        if (xpos > CELL_INTERVAL && !(this.x == CELL_INTERVAL + OFFSET && this.y == 0 + OFFSET) ) {
            this.x = xpos - CELL_INTERVAL;
        }
    }
    this.moveRight = function () {
        var xpos = this.x;
        if (xpos < canvas.clientWidth - CELL_INTERVAL) {
            this.x = xpos + CELL_INTERVAL;
        }
    }
    this.moveUp = function () {
        var ypos = this.y;
        if (ypos > CELL_INTERVAL && !(this.y == CELL_INTERVAL + OFFSET && this.x == 0 + OFFSET)) {
            this.y = ypos - CELL_INTERVAL;
        }
    }
    this.moveDown = function () {
        var ypos = this.y;
        if (ypos < canvas.clientHeight - CELL_INTERVAL) {
            this.y = ypos + CELL_INTERVAL;
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
    this.x = OFFSET + parseInt(Math.random() * (canvas.clientWidth / CELL_INTERVAL)) * 50;
    this.y = OFFSET + parseInt(Math.random() * (canvas.clientHeight / CELL_INTERVAL)) * 50;
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

// *****************************************GAME FUNCTIONS**********************************************

$(document).keydown(function (e) {  // on keydown
    keyPressed(e.keyCode);
});


function keyPressed (keyCode) {
    console.log(`keyPressed with code ${keyCode}`);
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
    updateGame(entities)
    drawGame();
    if (!foodCount) {
        scoretextarea.innerHTML = "You've won!";
        alert("You Win!");
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
            if ((steve.x == i.x) && (steve.y == i.y)) {
                // reset steve
                steve.x = OFFSET;
                steve.y = OFFSET;
                steve.deaths++;
            }
        }
        else if (i instanceof steak) { 
            if ((steve.x == i.x) && (steve.y == i.y)) {
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
            if (Math.random() < ZOMBIE_SPEED) { // move approx 5 out of 100 frames
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
        context.drawImage(f.img, parseInt(f.x), parseInt(f.y), f.width, f.height);
    });
   
};

// TODO Sprites!
// zombie sprite dimensions: 32 x 48 