var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

var player;

var spaceships;
var spaceshipSpeed = 200;
var speedMultiplier;
var scoreTracker;

var spacetime;

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

  //make spaceship group and add each spaceship into it
  spaceships = game.add.group();
  spaceships.enableBody = true;
  speedMultiplier = 1;
  scoreTracker = 0;
  for(var i=0; i < 5; i++) {
    var spaceship = spaceships.create(850, randomNum(70, 550), 'spaceship');
    spacetime = randomNum(5, 10) / 10;
    spaceship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier;
  }

  //add health icons
  health = MAX_HEALTH;
  for (var i=0; i < MAX_HEALTH; i++){
    healthIcons[i] = game.add.sprite(40 + 48 * (i + 1), 16, 'heart');
  }

  score = 0;
  scoreText = game.add.text(game.world.width / 2, 16, "Score: 0", {fontSize: '32px', fill: '#ffffff'});
  scoreText.anchor.setTo(0.5, 0);
}

function update() {

  //player movement
  if(this.cursors.up.isDown || this.keyW.isDown){
    player.body.y -= 4;
  }else if(this.cursors.down.isDown || this.keyS.isDown){
    player.body.y += 4;
  }

  //check for collision of spaceship and player
  game.physics.arcade.overlap(player, spaceships, hitSpaceship, null, this);

  //reset spaceship to right of screen off the left of the screen
  spaceships.forEach(checkShipPosition, this, true);

  //give the spaceships a random amount for each time the velocity is reset
  spacetime = randomNum(5, 10) / 10;

  //make sure no velocity is being acted upon the player throughout the game
  player.body.velocity.setTo(0,0);

  //update score
  scoreText.text = "Score: " + score;
  score++;
  scoreTracker++;             //increase spaceship speed every 500 points
  if (scoreTracker > 500){
    if(score < 5000){
      speedMultiplier += 0.25;
    }else if(score > 5000){
      speedMultiplier += 0.1;
    }
    scoreTracker = 0;
  }
}

function checkShipPosition(ship) {
  if (ship.x < -40) {
    ship.x = 850;
    ship.y = randomNum(70, 550);
    ship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier;
  }
}

function hitSpaceship(player, ship){
  health -= 1;
  for (i = 100; i > 0; i--){
    healthIcons[health].alpha = i / 100;
    ship.x = 845;
    ship.y = randomNum(70, 550);
    ship.body.velocity.x = -spaceshipSpeed * spacetime * speedMultiplier;
  }
  if (health == 0){
    game.state.restart();
  }

  playerRed();
  game.time.events.add(100, playerDefault, this);
  game.time.events.add(100, playerRed, this);
  game.time.events.add(100, playerDefault, this);
}

function randomNum(min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}

function playerDefault(){
  console.log("Switch to Default");
  player.loadTexture('alien');
  player.animations.play('jetpack', 10, true);
}

function playerRed(){
  console.log("Switch to Red");
  player.loadTexture('alienRed');
}
