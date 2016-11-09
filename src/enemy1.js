"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
//const Missile = require('./missile');

/* Constants */
const Enemy1_SPEED = -5;


/**
 * @module Enemy1
 * A class representing a Enemy1's helicopter
 */
module.exports = exports = Enemy1;

/**
 * @constructor Enemy1
 * Creates a Enemy1
 * @param {BulletPool} bullets the bullet pool
 */
function Enemy1(position) {
  this.angle = 0;
  this.position = position
  this.velocity = {x: 1, y: 0};
  this.img = new Image()
  this.img.src = 'assets/enemy_ships.png';
  this.id="enemy";
  this.radius=20;
}

/**
 * @function update
 * Updates the Enemy1 based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Enemy1.prototype.update = function(elapsedTime) {

  // set the velocity
  

  // determine Enemy1 angle
  this.angle = 0;

  // move the Enemy1
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  // don't let the Enemy1 move off-screen
  
}

/**
 * @function render
 * Renders the Enemy1 helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Enemy1.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(3*Math.PI/2);
  ctx.drawImage(this.img, 0, 0, 23, 28, -12.5, -12, 23, 27);
  ctx.restore();
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} direction
 */
Enemy1.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the Enemy1 still has missiles
 * to fire.
 */
Enemy1.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    //var missile = new Missile(position);
    //this.missiles.push(missile);
    this.missileCount--;
  }
}
