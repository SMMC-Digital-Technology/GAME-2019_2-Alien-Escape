var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

var gameOverText;
var restartText;

var player;

var spaceships;
var spaceshipSpeed = 200;
var speedMultiplier;
var scoreTracker;

var spacetime;

var endscreenActive;

var health;
var MAX_HEALTH = 3;
var healthIcons = [];

function preload() {
  //load assets
  game.load.image('spaceship', 'assets/Spaceship.png');
  game.load.image('background', 'assets/Background.png');
  game.load.image('heart', 'assets/heart.png');
  game.load.image('alienRed', 'assets/AlienRed.png');
  game.load.spritesheet('alien', 'assets/AlienSheet.png', 21, 38);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //add background into the game
  game.add.image(0, 0, "background");

  //add player into the game and give it features
  player = game.add.sprite(50, (game.world.height / 2) - 16, "alien");
  player.scale.setTo(2,2);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.immovable = true;
  player.animations.add('jetpack');
  player.animations.play('jetpack', 10, true);

  //add keyboard functionality
  this.cursors = this.input.keyboard.createCursorKeys();
  this.keyW = this.input.keyboard.addKey(Phaser.KeyCode.W);
  this.keyS = this.input.keyboard.addKey(Phaser.KeyCode.S);
  this.keyR = this.input.keyboard.addKey(Phaser.KeyCode.R);

  //make spaceship group and add each spaceship into it
  spaceships = game.add.group();
  spaceships.enableBody = true;
  speedMultiplier = 1;
  scoreTracker = 0;
  for(var i=0; i < 5; i++) {
    var spaceship = spaceships.create(900 - randomNum(0, 50), randomNum(50, 550), 'spaceship'); //random spawn location to each spaceship
    spacetime = randomNum(5, 10) / 10;
    spaceship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier; //random velocity to each spaceship
  }

  //add health icons
  health = MAX_HEALTH;
  for (var i=0; i < MAX_HEALTH; i++){
    healthIcons[i] = game.add.sprite(40 + 48 * (i + 1), 16, 'heart');
  }

  endscreenActive = false; //make the endscreen not active at the start of the game

  score = 0; //set the score to 0 at the start of the game
  scoreText = game.add.text(game.world.width / 2, 16, "Score: 0", {fontSize: '32px', fill: '#ffffff'}); //add the 'Score' text
  scoreText.anchor.setTo(0.5, 0);

  restartText = game.add.text(game.world.width / 2, 16, "Press R to restart", {fontSize: '32px', fill: '#ffffff'}) //add the 'Restart Game' text
  restartText.anchor.setTo(0.5, 0);
  restartText.alpha = 0;

  gameOverText = game.add.text(game.world.width / 2, (game.world.height / 2) - 100, "GAME OVER", {fontSize: '90px', fill: '#ff0000'}) //add the 'Game Over' text
  gameOverText.anchor.setTo(0.5, 0.5);
  gameOverText.alpha = 0;  //set the 'Game Over' text to invisble at the start of the game
  gameOverText.tween = game.add.tween(gameOverText).to({
    alpha: 1
  }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, 1500, true); //add fade in fade out effect to 'Game Over' text
  gameOverText.tween.pause();
}

function update() {

  //player movement
  if(this.cursors.up.isDown || this.keyW.isDown){
    player.body.y -= 4;
  }else if(this.cursors.down.isDown || this.keyS.isDown){
    player.body.y += 4;
  }

  //button to restart when game is over
  if(this.keyR.isDown && endscreenActive){
    game.state.restart();
  }

  //make all gameplay sprites invisible when the endscreen is active and all endscreen sprites visible
  if(endscreenActive){
    for (i = 1; i < 3; i++){
      healthIcons[i].alpha = 0;
    }
    player.alpha = 0;
    spaceships.alpha = 0;
    gameOverText.alpha = 100;
    gameOverText.tween.resume();
    restartText.alpha = 100;
    scoreText.y = (game.world.height / 2) + 82;
    scoreText.fontSize = '64px';
  }

  //check for collision of spaceship and player
  if(!endscreenActive){
    game.physics.arcade.overlap(player, spaceships, hitSpaceship, null, this);   //make sure it doesn't check for collision when on endcreen
  }

  //reset spaceship to right of screen off the left of the screen
  spaceships.forEach(checkShipPosition, this, true);

  //give the spaceships a random amount for each time the velocity is reset
  spacetime = randomNum(5, 10) / 10;

  //make sure no velocity is being acted upon the player throughout the game
  player.body.velocity.setTo(0,0);

  //update score
  scoreText.text = "Score: " + score;
  if (!endscreenActive){
    score++;
    scoreTracker++;             //increase spaceship speed every 500 points by 0.25 if under 5000 points and by 0.1 if over 5000 points
    if (scoreTracker > 500){
      if(score < 5000){
        speedMultiplier += 0.25;
      }else if(score > 5000){
        speedMultiplier += 0.1;
      }
      scoreTracker = 0; //after increasing spaceship speed reset scoretracker to 0 so it can start tracking to 500 points again
    }
  }
}

function checkShipPosition(ship) {
  if (ship.x < -40) {
    ship.x = 900 - randomNum(0, 50); //random x spawn
    ship.y = randomNum(50, 550); //random y spawn
    ship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier + Math.random() / 4; //new random velocity + slight offset to make the spaceship fly at different speeds if respawning at same time
  }
}

function hitSpaceship(player, ship){
  health -= 1;
  for (i = 100; i > 0; i--){
    healthIcons[health].alpha = i / 100;
    ship.x = 900 - randomNum(0, 50); //random x spawn
    ship.y = randomNum(50, 550); //random y spawn
    ship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier + Math.random() / 4; //new random velocity + slight offset to make the spaceship fly at different speeds if respawning at same time
  }
  if (health == 0){
    endscreenActive = true; //when no health is left game is over
  }

  //when the player is hit it flashes red twice
  playerRed();
  game.time.events.add(100, playerDefault, this);
  game.time.events.add(100, playerRed, this);
  game.time.events.add(100, playerDefault, this);
}

function randomNum(min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}

function playerDefault(){
  player.loadTexture('alien');
  player.animations.play('jetpack', 10, true);
}

function playerRed(){
  player.loadTexture('alienRed');
}
