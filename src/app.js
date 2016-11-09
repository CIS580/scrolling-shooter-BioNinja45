"use strict";

/* Classes and Libraries */
const Game = require('./game');
const Vector = require('./vector');
const Camera = require('./camera');
const Player = require('./player');
const BulletPool = require('./bullet_pool');
const Enemy1 = require('./enemy1.js');
const Enemy2 = require('./enemy2.js');
const Enemy3 = require('./enemy3.js');
const Enemy4 = require('./enemy4.js');
const Enemy5 = require('./enemy5.js');
const PowerUp = require('./powerup.js');
const Smoke = require('./smoke_particles');
var tilemap = require('./tilemap.js');
var tilemap2 = require('./tilemap2.js');
var tilemap3 = require('./tilemap3.js');
var tilemapData = require('../tilemaps/foreground.json');
var tilemapData2 = require('../tilemaps/middleground.json');
var tilemapData3 = require('../tilemaps/background.json');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var input = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false
}
var objects = [];
var camera = new Camera(canvas);
var bullets = new BulletPool(100);
var enemyBullets = new BulletPool(10000);
enemyBullets.color="red";
var missiles = [];
var player = new Player(bullets, missiles);
var counter = 0;
var enemies = [];
var enemyPositions = [];
var powerUps =[];
var powerUpsPosition=[];
var smokePositions = [];
var gameFinished=false;
var gameOver=false;
var bulletsShot = 0;
var enemiesDestroid = 0;
var powerUpsRetrieved = 0;

var smoke = new Smoke(10);
var smoke2 = new Smoke(5);



function createEnemyPositions(){
	enemyPositions.push(600);
	enemyPositions.push(1000);
	enemyPositions.push(1200);
	enemyPositions.push(1600);
	enemyPositions.push(2600);
	enemyPositions.push(2000);
	enemyPositions.push(800);
	enemyPositions.push(1100);
	enemyPositions.push(1400);
	enemyPositions.push(1900);
	enemyPositions.push(2150);
	enemyPositions.push(2000);
	enemyPositions.push(900);
	enemyPositions.push(200);
	enemyPositions.push(2400);
	enemyPositions.push(3000);
	enemyPositions.push(3600);
	enemyPositions.push(3200);
	enemyPositions.push(4400);
	enemyPositions.push(4000);
	enemyPositions.push(4600);
	enemyPositions.push(5200);
	enemyPositions.push(5400);
	enemyPositions.push(5000);
	enemyPositions.push(5600);
	enemyPositions.push(6200);
	powerUpsPosition.push(1000);
	powerUpsPosition.push(2000);
	powerUpsPosition.push(3000);
	powerUpsPosition.push(4000);
	powerUpsPosition.push(5000);
	powerUpsPosition.push(6000);
}
createEnemyPositions();
// Set up the screen canvas


  // Load the tilemap
  tilemap.load(tilemapData, {
   
  });
  // Load the tilemap
  tilemap2.load(tilemapData2, {
    
  });
  tilemap3.load(tilemapData3, {
    
  });
  




/**
 * @function onkeydown
 * Handles keydown events
 */
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = true;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = true;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = true;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = true;
      event.preventDefault();
      break;
	case ' ':
	  input.fire=true;
	  event.preventDefault();
	  break;
  }
}

/**
 * @function onkeyup
 * Handles keydown events
 */
window.onkeyup = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = false;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = false;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = false;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = false;
      event.preventDefault();
      break;
	case ' ':
	  input.fire=false;
	  event.preventDefault();
	  break;
  }
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
	if(gameOver || gameFinished)return;
	if(player.lives<1)gameOver=true;
	else if(player.position.x>7000)gameFinished=true;
	
	counter++;
	var bulletPool = bullets.pool;
	objects.forEach(function(object, x){
		for(i=0;i<bullets.end;i++){
			if(Math.abs(bulletPool[4*i] - object.position.x)<object.radius){
				if(Math.abs(bulletPool[4*i+1] - object.position.y)<object.radius){
					
					smoke2 = new Smoke(5);
					smoke2.emit({x:object.position.x,y:object.position.y});
					smokePositions.push(smoke2);
					enemiesDestroid++;
					objects.splice(x,1);
					
					bullets.pool[4*i]=0;
					bullets.pool[4*i+1]=0;
					bullets.pool[4*i+2]=0;
					bullets.pool[4*i+3]=0;
					bullets.end--;
				}
			}
		}
		if(Math.abs(player.position.x - object.position.x)<object.radius){
			if((Math.abs(player.position.y - object.position.y)<object.radius)){
				playerHit();
			}
		}
	});
	var enemyBulletPool = enemyBullets.pool;
	for(i=0;i<enemyBullets.end;i++){
			if(Math.abs(enemyBulletPool[4*i] - player.position.x-20)<player.radius2){
				if(Math.abs(enemyBulletPool[4*i+1] - player.position.y)<player.radius2){
					playerHit();
					enemyBullets.pool[4*i]=0;
					enemyBullets.pool[4*i+1]=0;
					enemyBullets.pool[4*i+2]=0;
					enemyBullets.pool[4*i+3]=0;
					enemyBullets.end--;
				}
			}
		}
	
	powerUps.forEach(function(powerUp,x){
		if(Math.abs(player.position.x-powerUp.position.x) < powerUp.radius){
			if(Math.abs(player.position.y-powerUp.position.y) < powerUp.radius){
				player.powerUps++;
				powerUpsRetrieved++;
				powerUps.splice(x,1);
			}
		}
	});
	if(input.fire && counter>20){
		bullets.add( {x:player.position.x,y:player.position.y},{x:5,y:0})
		counter=0;
		bulletsShot++;
		if(player.powerUps>0){
			bullets.add( {x:player.position.x,y:player.position.y},{x:5,y:1})
			bulletsShot++;
			if(player.powerUps>1){
				bulletsShot++;
				bullets.add( {x:player.position.x,y:player.position.y},{x:5,y:-1})
			}
		}
		objects.forEach(function(object,i){
			if(object.id=="enemy3"){
				enemyBullets.add({x:object.position.x,y:object.position.y},{x:-2,y:0})
			}
		});  
		
	}
	enemyPositions.forEach( function(position, i){
		
		if(player.position.x>position){
			
			var newEnemy=new Enemy1({x:position+1000,y:Math.random()*500});
			var newEnemy2=new Enemy2({x:position+1000,y:Math.random()*500});
			var newEnemy3=new Enemy3({x:position+1000,y:Math.random()*500});
			var newEnemy4=new Enemy4({x:position+1000,y:Math.random()*500});
			var newEnemy5=new Enemy5({x:position+1000,y:Math.random()*500});
			enemies.push(newEnemy5);
			enemies.push(newEnemy);
			enemies.push(newEnemy2);
			enemies.push(newEnemy3);
			enemies.push(newEnemy4);
			
			objects.push(newEnemy5);
			objects.push(newEnemy);
			objects.push(newEnemy2);
			objects.push(newEnemy3);
			objects.push(newEnemy4);
			enemyPositions.splice(i,1);
		}
		
	});
	powerUpsPosition.forEach(function(position, i){
		if(player.position.x>position){
			powerUps.push(new PowerUp({x:position+500,y:Math.random()*500}));
			powerUpsPosition.splice(i,1);
		}
	});
	
  // update the player
  player.update(elapsedTime, input);

  // update the camera
  camera.update(player.position);

  // Update bullets
  bullets.update(elapsedTime, function(bullet,i){
    if(!camera.onScreen(bullet)) return true;
    return false;
  });
  enemyBullets.update(elapsedTime, function(bullet,i){
    if(!camera.onScreen(bullet)) return true;
    return false;
  });

  // Update missiles
  var markedForRemoval = [];
  missiles.forEach(function(missile, i){
    missile.update(elapsedTime);
    if(Math.abs(missile.position.x - camera.x) > camera.width * 2)
      markedForRemoval.unshift(i);
  });
  // Remove missiles that have gone off-screen
  markedForRemoval.forEach(function(index){
    missiles.splice(index, 1);
  });
  objects.forEach(function(object){
		object.update(elapsedTime);
	});
	smoke.update(elapsedTime);
	smokePositions.forEach(function(smokePos){
		smokePos.update(elapsedTime);
	});
	powerUps.forEach(function(powerup){
		powerup.update(elapsedTime);
	});
}

function playerHit(){
	var newPlayer = new Player(bullets, missiles);
	newPlayer.position={x:player.position.x-400,y:player.position.y};
	newPlayer.lives=player.lives-1;
	
	smoke.emit({x:player.position.x,y:player.position.y});
	bullets
	player = newPlayer;
	bullets = new BulletPool(100);
	enemyBullets = new BulletPool(10000);
	enemyBullets.color="red";
}
/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
	if(gameFinished){
		renderSummaryScreen(elapsedTime,ctx);
		return;
	}
	if(gameOver){
		renderEndScreen(elapsedTime,ctx)
		return;
	}
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 2048, 786);

  // TODO: Render background

  // Transform the coordinate system using
  // the camera position BEFORE rendering
  // objects in the world - that way they
  // can be rendered in WORLD cooridnates
  // but appear in SCREEN coordinates
  ctx.save();
  renderBackgrounds(elapsedTime, ctx);
  ctx.translate(-camera.x, -camera.y);
  renderWorld(elapsedTime, ctx);
  ctx.restore();

  // Render the GUI without transforming the
  // coordinate system
  renderGUI(elapsedTime, ctx);
}

function renderBackgrounds(elapsedTime, ctx) {
 
ctx.save();
 

  // The midground scrolls at 60% of the foreground speed
  ctx.save();
  ctx.translate(-camera.x * 0.6, 0);
  tilemap2.render(ctx);
  ctx.restore();
 // The background scrolls at 2% of the foreground speed
  ctx.translate(-camera.x * 0.2, 0);
  tilemap3.render(ctx);
  ctx.restore();
  // The foreground scrolls in sync with the camera
  ctx.save();
  ctx.translate(-camera.x, 0);
  tilemap.render(ctx);
  ctx.restore();
}

/**
  * @function renderWorld
  * Renders the entities in the game world
  * IN WORLD COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function renderWorld(elapsedTime, ctx) {
    // Render the bullets
    bullets.render(elapsedTime, ctx);
	enemyBullets.render(elapsedTime, ctx);

    // Render the missiles
    missiles.forEach(function(missile) {
      missile.render(elapsedTime, ctx);
    });

	objects.forEach(function(object){
		object.render(elapsedTime,ctx);
	});
    // Render the player
    player.render(elapsedTime, ctx);
	smoke.render(elapsedTime,ctx);
	smokePositions.forEach(function(smokePos){
		smokePos.render(elapsedTime,ctx);
	});
	powerUps.forEach(function(powerup){
		powerup.render(elapsedTime,ctx);
	});
}

/**
  * @function renderGUI
  * Renders the game's GUI IN SCREEN COORDINATES
  * @param {DOMHighResTimeStamp} elapsedTime
  * @param {CanvasRenderingContext2D} ctx
  */
function renderGUI(elapsedTime, ctx) {
  ctx.fillStyle = "green";
	ctx.font = "bold 25px Arial";
	ctx.fillText("Lives: " + player.lives, 10,30);
}

function renderSummaryScreen(elapsedTime,ctx){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 2048, 786);
	ctx.fillStyle = "white";
	ctx.font = "bold 50px Arial";
	ctx.fillText("Summary", 350,100);
	ctx.font = "bold 25px Arial";
	ctx.fillText("Shots Fired: " + bulletsShot, 100,300);
	ctx.fillText("Enemies Destroid: " + enemiesDestroid, 100,400);
	ctx.fillText("PowerUps Retrieved: " + powerUpsRetrieved, 100,500);
}
function renderEndScreen(elapsedTime,ctx){
		ctx.font = "75px Arial";
		ctx.fillText("GAME OVER", 200,200);
		ctx.font = "50px Arial";
		ctx.fillText("REFRESH BROWSER TO RESTART",150,300);
		return;
}