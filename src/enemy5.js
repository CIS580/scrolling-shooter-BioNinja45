"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
//const Missile = require('./missile');

/* Constants */
const Enemy5_SPEED = -5;


/**
 * @module Enemy5
 * A class representing a Enemy5's helicopter
 */
module.exports = exports = Enemy5;

/**
 * @constructor Enemy5
 * Creates a Enemy5
 * @param {BulletPool} bullets the bullet pool
 */
function Enemy5(position) {

  this.angle = 0;
  this.position = position
  this.velocity = {x: 0, y: 0};
  this.img = new Image()
  this.img.src = 'assets/bombship.png';
  this.id="enemy";
  this.radius=40;
}

/**
 * @function update
 * Updates the Enemy5 based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
Enemy5.prototype.update = function(elapsedTime) {

  // set the velocity
  

  // determine Enemy5 angle
  this.angle = 0;

  // move the Enemy5
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  if(this.position.y<50)this.velocity.y=4;
  if(this.position.y>700)this.velocity.y=-4;

  // don't let the Enemy5 move off-screen
  
}

/**
 * @function render
 * Renders the Enemy5 helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
Enemy5.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);
  ctx.rotate(3*Math.PI/2);
  ctx.drawImage(this.img, 0, 0, 25, 25, -12.5, -12, 50, 50);
  ctx.restore();
}

/**
 * @function fireBullet
 * Fires a bullet
 * @param {Vector} directiond
 */
Enemy5.prototype.fireBullet = function(direction) {
  var position = Vector.add(this.position, {x:30, y:30});
  var velocity = Vector.scale(Vector.normalize(direction), BULLET_SPEED);
  this.bullets.add(position, velocity);
}

/**
 * @function fireMissile
 * Fires a missile, if the Enemy5 still has missiles
 * to fire.
 */
Enemy5.prototype.fireMissile = function() {
  if(this.missileCount > 0){
    var position = Vector.add(this.position, {x:0, y:30})
    //var missile = new Missile(position);
    //this.missiles.push(missile);
    this.missileCount--;
  }
}
