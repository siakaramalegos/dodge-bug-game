// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;

    // Pick a random row and random speed for each new enemy
    this.y = (Math.floor(Math.random() * (3 - 0)))*85 + 60;
    console.log('enemy ' + this.y);
    this.speed = (Math.floor(Math.random() * (3 - 1)) + 1)*100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.isCollision();
    // console.log(this.x);

    // If the enemy is past the edge of the canvas, let him go a bit further before looping back to the beginning.
    if (this.x < 707) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    };
}

Enemy.prototype.isCollision = function() {
    // console.log('check isCollision');
    if (this.x < player.x + 5 && this.x > player.x - 5 && this.y == player.y) {
        console.log('collision at '+ this.x + ', ' + this.y);
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    // Player.reset puts the player in the starting position.
    this.reset();
}

// Update the player's position, required method for game
Player.prototype.update = function() {
    // If the player has reached the water, reset player to starting position.
    if (this.y < 60) {
        this.reset();
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    // Starting position for the player (middle bottom).
    this.x = 202;
    this.y = 400;
}

Player.prototype.handleInput = function(input) {
    // Handle player movement with limits so that if he/she reaches edge of screen, he/she does not move
    // in an invalid direction.  Only exception is up because when player reaches the water, game is reset.
    if (input == 'up') {
        this.y -= 85;
    } else if (input == 'down') {
        if (this.y != 400){
            this.y += 85;
        }
    } else if (input == 'right') {
        if (this.x != 404) {
            this.x += 101;
        }
    } else if (input == 'left') {
        if (this.x != 0){
            this.x -= 101;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(), new Enemy()];
// Place the player object in a variable called player
player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
