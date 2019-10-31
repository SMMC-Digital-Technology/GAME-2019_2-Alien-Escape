var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

var player;

var spaceships;
var spaceshipSpeed = 200;

var spacetimes;

var health;
var MAX_HEALTH = 3;
var healthIcons = [];

function preload() {
  game.load.image('alien', 'assets/Alien.png');
  game.load.image('spaceship', 'assets/Spaceship.png');
  game.load.image('background', 'assets/Background.png');
  game.load.image('heart', 'assets/heart.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.image(0, 0, "background");

  player = game.add.sprite(50, (game.world.height / 2) - 16, "alien");
  player.scale.setTo(2,2);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.immovable = true;

  this.cursors = this.input.keyboard.createCursorKeys();
  this.keyW = this.input.keyboard.addKey(Phaser.KeyCode.W);
  this.keyS = this.input.keyboard.addKey(Phaser.KeyCode.S);

  spaceships = game.add.group();
  spaceships.enableBody = true;
  for(var i=0; i < 5; i++) {
    var spaceship = spaceships.create(850, randomNum(70, 550), 'spaceship');
    spacetimes = Math.random();
    spaceship.body.velocity.x = -spaceshipSpeed * spacetimes;
    console.log(spacetimes);
  }

  health = MAX_HEALTH;
  for (var i=0; i < MAX_HEALTH; i++){
    healthIcons[i] = game.add.sprite(40 + 48 * (i + 1), 16, 'heart');
  }

  score = 0;
  scoreText = game.add.text(game.world.width / 2, 16, "Score: 0", {fontSize: '32px', fill: '#ffffff'});
  scoreText.anchor.setTo(0.5, 0);


}

function update() {

  if(this.cursors.up.isDown || this.keyW.isDown){
    player.body.y -= 4;
  }else if(this.cursors.down.isDown || this.keyS.isDown){
    player.body.y += 4;
  }

  game.physics.arcade.overlap(player, spaceships, hitSpaceship, null, this);

  spaceships.forEach(checkShipPosition, this, true);

  scoreText.text = "Score: " + score;
  score++;
}

function checkShipPosition(ship) {
  if (ship.x < -40) {
    ship.x = 850;
    ship.y = randomNum(70, 550);
  }
}

function hitSpaceship(player, ship){
  healthIcons[health].alpha = 0;
  health -= 1;
}

function randomNum(min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}
