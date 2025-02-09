var config = {
	type: Phaser.AUTO,
	width: 1024 ,
	height: 728,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);


function init(){
	var platforms;
	var player;
	var stars;
	var bombs;
	var monster;
}
function preload(){
	this.load.image('background','assets/fondpong.png');	
	this.load.image('sol','assets/soltir.png');
	this.load.image('mur','assets/murtir.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('plate', 'assets/platform.png');
	this.load.image('monster','assets/monster.png');
	this.load.image('balles','assets/balles.png');
	this.load.image('tirE','assets/tirE.png');
	this.load.image('finished', 'assets/finished.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
	this.load.image('arme', 'assets/arme.png');
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(60,730,'sol').setScale(1).refreshBody();
	platforms.create(1060,730,'sol');
	platforms.create(1150,100,'sol');
	platforms.create(250,630,'plate');
	platforms.create(450,540,'plate');
	platforms.create(500,540,'plate');
	platforms.create(750,440,'plate');
	platforms.create(800,440,'plate');
	platforms.create(600,340,'plate');
	platforms.create(-100,340,'sol');
	platforms.create(625,150,'plate');
	platforms.create(575,200,'plate');
	platforms.create(400,150,'plate');
	platforms.create(450,150,'plate');
	platforms.create(50,250,'plate');
	platforms.create(160,150,'plate');
	platforms.create(380,280,'plate');
	platforms.create(-30,500,'mur');
	platforms.create(1050,500,'mur');
	platforms.create(60,-10,'sol');
	platforms.create(1060,-10,'sol');
	
	tirE = this.physics.add.staticGroup();
	tirE.create(920,550,'tirE').setScale(1).refreshBody();
	
	player = this.physics.add.sprite(40,685,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	//Monster
 
	monster = this.physics.add.group({
    key: 'monster',
    repeat: 1,
    setXY: {
      x: 280,
      y: 290,
      stepX: 500,
      stepY: 390
    }
  });
  	monster.setVelocityX(100);
	
	monster.children.iterate(function (child){
		child.setBounceX(1);
	});
	
	this.physics.add.collider(monster, platforms);
	this.physics.add.collider(monster, [player], hitmonster, null, this);
	
		//toucher
	
	function hitmonster (player, monster){
		
		this.physics.pause();
		player.setTint(0xff0000);
	};
	
	//star
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:950, y:50, stepX:0 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
		 
		finished = this.physics.add.staticGroup();
		finished.create(500,300,'finished')
	 }
	 
	 
	 //Lorsqu'on ramasse l'arme on peut tirer
	 
	 arme = this.physics.add.group({
		key: 'arme',
		repeat:0,
		setXY: {x:950, y:680, stepX:70 }
	})
	 this.physics.add.collider(arme, platforms);
	 this.physics.add.overlap(player,arme,collectarme, null, this);
	 
	 function collectarme (player, arme){
		 arme.disableBody(true, true);
	 }
	 


	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 4, end: 4}),
		frameRate: 20,
		repeat: -1
	});

	
}

function update(){
	
	player.body.velocity.x = 0;
	
		if(cursor.left.isDown){
		player.anims.play('left',true);
		player.setVelocityX(-190);
		player.setFlipX(false);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(190);
		player.setFlipX(true);	
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown && player.body.touching.down){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(400);
	}
}
