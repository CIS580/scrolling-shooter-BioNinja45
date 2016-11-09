"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
//const Missile = require('./missile');

/* Constants */
const Enemy4_SPEED = -5;


/**
 * @module Enemy4
 * A class representing a Enemy4's helicopter
 */
module.exports = exports = Enemy4;

/**
 * @constructor Enemy4
 * Creates a Enemy4
 * @param {BulletPool} bullets the bullet pool
 */
function Enemy4(position) {

  this.angle = 0;
  this.position = position
  this.velocity = {x: 1, y: 0};
  this.img = new Image()
  this.img.src = 'assets/enemy_ships.png';
  this.id="enemy";
  this.radius=20;
  this.change = 0.1;
}

/**
 * @function update
 * Updates the Enemy4 based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Enemy4.prototype.update = function(elapsedTime) {

  // set the velocity
  

  // determine Enemy4 angle
  this.angle = 0;
  this.velocity.x+=this.change;
  this.velocity.y+=this.change;
  // move the Enemy4
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  if(this.position.y<50)this.velocity.y=4;
  if(this.position.y>700)this.velocity.y=-4;
  if(this.velocity.x>3)this.change=-0.1;
  if(this.velocity.x<-3)this.change=0.1;

  // don't let the Enemy4 move off-screen
  
}

/**
 * @function render
 * Renders the Enemy4 helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Enemy4.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(3*Math.PI/2);
  ctx.drawImage(this.img, 0, 86, 23, 28, -12.5, -12, 23, 27);
  ctx.restore();
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} direction
 */
Enemy4.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the Enemy4 still has missiles
 * to fire.
 */
Enemy4.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    //var missile = new Missile(position);
    //this.missiles.push(missile);
    this.missileCount--;
  }
}
