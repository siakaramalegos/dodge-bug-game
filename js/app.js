// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Create random y positions and speeds.
    this.reset();

}

Enemy.prototype.reset = function() {
    // Starting x position for the enemy (middle bottom).
    this.x = 0;

    // Pick a random row (y) and random speed for each new enemy
    this.y = (Math.floor(Math.random() * (3 - 0)))*85 + 60;
    this.speed = (Math.floor(Math.random() * (3 - 1)) + 1)*100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check for collisions.
    this.isCollision();

    // If the enemy is past the edge of the canvas, let him go a bit further before looping back to the beginning.
    if (this.x < 707) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    };
}

Enemy.prototype.isCollision = function() {
    // Check for any overlap of bug and player.  The begin and end of the player visually is about -80 to -20 pixels from its x.
    // The bug ranges from 101 to 0 pixels from its x.  Reset the player when he/she collides with the bug.
    if (this.y == player.y &&
        ((this.x < player.x - 20 && this.x > player.x - 80) ||
            (this.x -101 < player.x - 20) && (this.x - 101 > player.x - 80))) {
        // Reduce player life by 1 and reset it back to starting position.
        player.lives -= 1;
        player.reset();

        // Reset the colliding bug as well for more variety.
        this.reset();
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
    // Lives left image for status at top left
    this.lifeSprite = 'images/Heart-small.png';

    // Initial number of lives, score, and level
    this.lives = 3;
    this.score = 0;
    this.level = 1;

    // Player.reset puts the player in the starting position.
    this.reset();
}

// Update the player's position, required method for game
Player.prototype.update = function() {

    // If the player has reached the water, increase it's score by 2 points and reset player to starting position.
    if (this.y < 60) {
        this.score += 2;

        // Check total score to increase level every 10 points
        if (this.score % 10 == 0) {
            this.levelUp();
        };
        this.reset();
    };
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Draw score and level.
    ctx.fillText('score: ' + this.score, 480, 92);
    ctx.fillText('level: ' + this.level, 130, 570);

    // Draw score and how many lives are left with hearts.
    if (this.lives <= 0) {
        ctx.fillText('game over', 180, 92);
        ctx.fillText('refresh your browser', 430, 300);
        ctx.fillText('to play again', 350, 340);
    } else if (this.lives >= 1) {
        // Draw lives
        ctx.drawImage(Resources.get(this.lifeSprite), 24, 40);
        if (this.lives >= 2) {
            ctx.drawImage(Resources.get(this.lifeSprite), 74, 40);
            if (this.lives == 3) {
                ctx.drawImage(Resources.get(this.lifeSprite), 124, 40);
            }
        }
    };


}

Player.prototype.reset = function() {
    // Starting position for the player (middle bottom).
    this.x = 202;
    this.y = 400;
}

// Handle updates to game for each level (increase complexity).
Player.prototype.levelUp = function() {
    this.level += 1;

    // Add a new enemy on the even-numbered levels.
    if (this.level % 2 == 0) {
        allEnemies[allEnemies.length] = new Enemy();
    }

    // Add a new gem on the odd-numbered levels, up to 3 gems.
    allGems = [new Gem()];
    if (this.level >= 3) {
        allGems[allGems.length] = new Gem();
        if (this.level >= 5) {
            allGems[allGems.length] = new Gem();
        }
    }

}

Player.prototype.handleInput = function(input) {
    // Handle player movement with limits so that if he/she reaches edge of screen, he/she does not move
    // in an invalid direction.  Only exception is up because when player reaches the water, game is reset.
    // First check that game is not over (block movement if it is).
    if (this.lives > 0) {
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
        };
    };
}

var Gem = function() {
    this.sprite = 'images/gem-orange-small.png';

    // Pick a random row and column for the gem.
    this.y = (Math.floor(Math.random() * (3 - 0))) * 85 + 60;
    this.x = (Math.floor(Math.random() * (5-0))) * 101;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.isCollision = function() {
    // Check for player colliding with gem. Remove the gem when player collides with it.
    if (player.y == this.y && player.x == this.x) {
        player.score += 2;
        allGems.splice(allGems.indexOf(this), 1);
    };
}

Gem.prototype.update = function() {
    // Check for collisions.
    this.isCollision();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(), new Enemy()];
// Place the player object in a variable called player
player = new Player();
// Place the initial gem in an array called allGems
allGems = [new Gem()];



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
