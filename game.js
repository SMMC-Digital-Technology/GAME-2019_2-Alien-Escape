var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

var player;

function preload() {
  game.load.image('alien', 'assets/Alien.png');
  game.load.image('spaceship', 'assets/Spaceship.png');
  game.load.image('background', 'assets/Background.png');
  //game.load.image('ground', 'assets/ground.png');
  //game.load.image('heart', 'assets/heart.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, "background");

  player = game.add.sprite(50, (game.world.height / 2) - 16, "alien");
  player.scale.setTo(2,2);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.immovable = true;

  this.cursors = this.input.kerboard.createCursorKeys();
  this.KeyW = this.input.keyboard.addKey(Phaser.KeyCode.W);
  this.KeyS = this.input.keyboard.addKey(Phaser.KeyCode.S);

  score = 0;
  scoreText = game.add.text(game.world.width / 2, 16, "Score: 0", {fontSize: '32px', fill: '#ffffff'});
  scoreText.anchor.setTo(0.5, 0);


}

function update() {
  scoreText.text = "Score: " + score;
}
