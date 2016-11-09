"use strict";

/* Classes and Libraries */
const Vector = require('./vector');
//const Missile = require('./missile');




/**
 * @module PowerUp
 * A class representing a PowerUp's helicopter
 */
module.exports = exports = PowerUp;

/**
 * @constructor PowerUp
 * Creates a PowerUp
 * @param {BulletPool} bullets the bullet pool
 */
function PowerUp(position) {
  this.missileCount = 4;
  this.angle = 0;
  this.position = position
  this.img = new Image()
  this.img.src = 'assets/powerups.png';
  this.id="powerup";
  this.radius=20;
}

/**
 * @function update
 * Updates the PowerUp based on the supplied input
 * @param {DOMHighResTimeStamp} elapedTime
 * @param {Input} input object defining input, must have
 * boolean properties: up, left, right, down
 */
PowerUp.prototype.update = function(elapsedTime) {
  // determine PowerUp angle
  this.angle = 0;

}

/**
 * @function render
 * Renders the PowerUp helicopter in world coordinates
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
PowerUp.prototype.render = function(elapasedTime, ctx) {
  var offset = this.angle * 23;
  ctx.save();
  ctx.translate(this.position.x, this.position.y);

  ctx.drawImage(this.img, 0,0, 18, 27, -12.5, -12, 23, 27);
  ctx.restore();
}

