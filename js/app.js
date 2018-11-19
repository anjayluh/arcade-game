// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Rock.png';
    this.x = 0;
    this.y = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log('hey');
    if (this.x < 404) {
        this.x += 101 * dt;

    } else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        //x position
        this.x = 101 * 2;
        //y position
        this.y = 83 * 5;
        //sprite to be the player
        this.sprite = 'images/char-princess-girl.png';
        this.state = false;
    }

    update() {
        //Check for collision
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && this.x === Math.round(enemy.x)) {
                //Action in case of collision
                this.x = 101 * 2;
                this.y = 83 * 5;
            }
        }
        //Check for win
        if (this.y === 0) {
            // Create win modal form div and set class to win but first check if it doesn't exist yet
            if (document.getElementsByTagName('div').length < 1) {
                document.body.insertAdjacentHTML('afterbegin', '<div class="winner" id="winner">Congratulations 🎉🎉, you have rescued the princess</div>');
                //Adding  close button.
                // let close = document.createElement("button");
                // close.setAttribute("class", "close");
                // // Add some text
                // close.appendChild(document.createTextNode("Close"));
                // // Add it to the document body
                // winner.appendChild(close);

                // //Adding play again button
                // let restart = document.createElement("button");
                // restart.setAttribute("class", "play-again");
                // // Add some text
                // restart.appendChild(document.createTextNode("Play Again"));
                // // Add it to the document body
                // winner.appendChild(restart);
                this.state = true;
            }
        }

    }

    render() {
        //Draw player on the current x/y position of the board
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
        //Update x and y according to the input given
        if (input === 'left') {
            if (this.x > 0) {
                this.x -= 101;
            }
        } else if (input === 'right') {
            if (this.x < 404) {
                this.x += 101;
            }
        } else if (input === 'up') {
            if (this.y > 0) {
                this.y -= 83;
            }
        } else if (input === 'down') {
            if (this.y < 415) {
                this.y += 83;
            }
        }
    }

    reset() {
        //Reset the player once they have reached the final line
        //x position
        if (this.state === true) {
            this.x = 101 * 2;
            //y position
            this.y = 83 * 5;
            document.getElementById("winner").style.display = 'none';
        }
    }
}
// Now instantiate your objects.
//player object instance

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();

let allEnemies = [];
let rock1 = new Enemy();
let rock2 = new Enemy();
let rock3 = new Enemy();
rock1.y = 83;
rock1.x += 101;
rock2.y = 83 * 2;
rock3.y = 83 * 3;
rock3.x += 101;
allEnemies.push(rock1);
allEnemies.push(rock2);
allEnemies.push(rock3);

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

// if (this.state === true) {
//     player.reset();
// }