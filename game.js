var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

function preload() {
  /* game.load.image('alien', 'assets/alien.png');
  game.load.image('spaceship', 'assets/spaceship.png');
  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('heart', 'assets/heart.png'); */
}

function create() {
  score = 0;
  scoreText = game.add.text(game.world.width / 2, 16, "Score: 0", {fontSize: '32px', fill: '#ffffff'});
  scoreText.anchor.setTo(0.5, 0);


}

function update() {
  scoreText.text = "Score: " + score;
}
