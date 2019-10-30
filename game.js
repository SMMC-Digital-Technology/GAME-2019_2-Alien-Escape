var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var score, scoreText;

var player;

var spaceship1, spaceship2, spaceship3, spaceship4, spaceship5;
var spaceshipSpeed = 200;

function preload() {
  game.load.image('alien', 'assets/Alien.png');
  game.load.image('spaceship', 'assets/Spaceship.png');
  game.load.image('background', 'assets/Background.png');
  //game.load.image('ground', 'assets/ground.png');
  //game.load.image('heart', 'assets/heart.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.image(0, 0, "background");

  player = game.add.sprite(50, (game.world.height / 2) - 16, "alien");
  player.scale.setTo(2,2);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.immovable = true;

  /*spaceship1 = game.add.sprite(850, 10, 'spaceship');
  spaceship1.enableBody = true;
  spaceship1.body.velocity.x -= spaceshipSpeed * Math.random();

  spaceship2 = game.add.sprite(850, 140, 'spaceship');
  spaceship2.enableBody = true;
  spaceship2.body.velocity.x -= spaceshipSpeed * Math.random();

  spaceship3 = game.add.sprite(850, 270, 'spaceship');
  spaceship3.enableBody = true;
  spaceship3.body.velocity.x -= spaceshipSpeed * Math.random();

  spaceship4 = game.add.sprite(850, 400, 'spaceship');
  spaceship4.enableBody = true;
  spaceship4.body.velocity.x -= spaceshipSpeed * Math.random();

  spaceship5 = game.add.sprite(850, 530, 'spaceship');
  spaceship5.enableBody = true;
  spaceship5.body.velocity.x -= spaceshipSpeed * Math.random();*/

  this.cursors = this.input.keyboard.createCursorKeys();
  this.keyW = this.input.keyboard.addKey(Phaser.KeyCode.W);
  this.keyS = this.input.keyboard.addKey(Phaser.KeyCode.S);

  /*spaceships = game.add.group();
  spaceships.enableBody = true;
  for(var i=0; i < 5; i++){
    var spaceship = spaceships.create(850, (i*130) + 10, 'spaceship');
    spaceship.body.velocity.x -= spaceshipSpeed * Math.random();
  }*/



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

  scoreText.text = "Score: " + score;
  score++;
}
