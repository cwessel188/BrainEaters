var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");

var CELL_INTERVAL = 50;
var PICTURE_SIZE = 40;
var OFFSET = 5;

// steve!
function hero() {
    this.img = document.createElement('img');
    this.img.src = "../Content/images/steve.png";
    this.width = PICTURE_SIZE;
    this.height = PICTURE_SIZE;
    this.img.style.x = OFFSET; // coordinates
    this.img.style.y = OFFSET;
}

// zombies!
var zombie = (function () {
    function zombie() {
        // moving functions
        this.moveLeft = function () {
            var xpos = parseInt(this.img.style.x);
            if (xpos > CELL_INTERVAL) {
                this.img.style.x = xpos - CELL_INTERVAL + 'px';
            }
        };
        this.moveRight = function () {
            var xpos = parseInt(steve.style.x);
            if (xpos < canvas.clientWidth - CELL_INTERVAL) {
                steve.style.x = xpos + CELL_INTERVAL + 'px';
            }
        };
        this.moveUp = function () {
            var ypos = parseInt(steve.style.y);
            if (ypos > CELL_INTERVAL) {
                steve.style.y = ypos - CELL_INTERVAL + 'px';
            }
        };
        this.moveDown = function () {
            var ypos = parseInt(steve.style.y);
            if (ypos < canvas.clientHeight - CELL_INTERVAL) {
                steve.style.y = ypos + CELL_INTERVAL + 'px';
            }
        };
        this.img = document.createElement('img');
        this.img.src = "../Content/images/Passive_Zombie.png";
        this.width = PICTURE_SIZE;
        this.height = PICTURE_SIZE;

        // make coordinates random                  numCells
        this.img.style.x = OFFSET + parseInt(Math.random() * (canvas.clientWidth / CELL_INTERVAL)) * 50;
        this.img.style.y = OFFSET + parseInt(Math.random() * (canvas.clientHeight / CELL_INTERVAL)) * 50;
    }
    return zombie;
})();

var steve = new hero();

var zombie1 = new zombie();
var zombie2 = new zombie();
var zombie3 = new zombie();

// *******************************************GAME FUNCTIONS**********************************************
// on keydown
$(window).keydown(function (e) {
    switch (event.keyCode) {
        case 65:
        case 37:
            var xpos = parseInt(steve.img.style.x);
            if (xpos > CELL_INTERVAL) {
                steve.img.style.x = xpos - CELL_INTERVAL + 'px';
            }
            break;
        case 68:
        case 39:
            var xpos = parseInt(steve.img.style.x);
            if (xpos < canvas.clientWidth - CELL_INTERVAL) {
                steve.img.style.x = xpos + CELL_INTERVAL + 'px';
            }
            break;
        case 87:
        case 38:
            var ypos = parseInt(steve.img.style.y);
            if (ypos > CELL_INTERVAL) {
                steve.img.style.y = ypos - CELL_INTERVAL + 'px';
            }
            break;
        case 83:
        case 40:
            var ypos = parseInt(steve.img.style.y);
            if (ypos < canvas.clientHeight - CELL_INTERVAL) {
                steve.img.style.y = ypos + CELL_INTERVAL + 'px';
            }
            break;
    }
});

var mainloop = function () {
    updateGame();
    drawGame();

    window.requestAnimationFrame(mainloop);
};
window.requestAnimationFrame(mainloop);

var updateGame = function () {
    if ((steve.img.style.x == zombie1.img.style.x) && (steve.img.style.y == zombie1.img.style.y)) {
        alert("collison");

        // reset steve
        steve.style.x = OFFSET;
        steve.style.y = OFFSET;
    }
};

var drawGame = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw grid
    // horizontal lines
    //for (var i = 0; i <= canvas.width; i += CELL_INTERVAL) {
    //    context.moveTo(0, i);
    //    context.lineTo(canvas.height, i);
    //    context.stroke();
    //}
    //// vertical lines
    //for (var i = 0; i <= canvas.height; i += CELL_INTERVAL) {
    //    context.moveTo(i, 0);
    //    context.lineTo(i, canvas.width);
    //    context.stroke();
    //}
    //draw Steve
    context.drawImage(steve.img, parseInt(steve.img.style.x), parseInt(steve.img.style.y), steve.width, steve.height);

    // draw zombie
    context.drawImage(zombie1.img, parseInt(zombie1.img.style.x), parseInt(zombie1.img.style.y), zombie1.width, zombie1.height);
    context.drawImage(zombie2.img, parseInt(zombie2.img.style.x), parseInt(zombie2.img.style.y), zombie2.width, zombie2.height);
    context.drawImage(zombie3.img, parseInt(zombie3.img.style.x), parseInt(zombie3.img.style.y), zombie3.width, zombie3.height);
};
// TODO Sprites!
// zombie sprite dimensions: 32 x 48
//# sourceMappingURL=braineaterstypescript.js.map
