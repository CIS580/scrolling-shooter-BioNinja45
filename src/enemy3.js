"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
//const Missile = require('./missile');

/* Constants */
const Enemy3_SPEED = -5;


/**
 * @module Enemy3
 * A class representing a Enemy3's helicopter
 */
module.exports = exports = Enemy3;

/**
 * @constructor Enemy3
 * Creates a Enemy3
 * @param {BulletPool} bullets the bullet pool
 */
function Enemy3(position) {

  this.angle = 0;
  this.position = position
  this.velocity = {x: 1, y: 4};
  this.img = new Image()
  this.img.src = 'assets/enemy_ships.png';
  this.id="enemy3";
  this.radius=20;
  this.change=0.1;
}

/**
 * @function update
 * Updates the Enemy3 based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Enemy3.prototype.update = function(elapsedTime) {

  // set the velocity
  

  // determine Enemy3 angle
  this.angle = 0;
  this.velocity.y+=this.change;
  // move the Enemy3
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  if(this.position.y<50)this.position.y=50;
  if(this.position.y>700)this.position.y=700;
  
  if(this.velocity.y>4)this.change=-0.1;
  if(this.velocity.y<-4)this.change=0.1;

  // don't let the Enemy3 move off-screen
  
}

/**
 * @function render
 * Renders the Enemy3 helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Enemy3.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(3*Math.PI/2);
  ctx.drawImage(this.img, 0, 58, 23, 28, -12.5, -12, 23, 27);
  ctx.restore();
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} direction
 */
Enemy3.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the Enemy3 still has missiles
 * to fire.
 */
Enemy3.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    //var missile = new Missile(position);
    //this.missiles.push(missile);
    this.missileCount--;
  }
}
