'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , Actor = require('./abstract/Actor');

var BULLET_SPEED = 35
    , BULLET_LIFE_TIME = 20;

module.exports = createSubClass(Actor, 'Laser', {
    initialize: Laser$initialize,
    tick: Laser$tick,
    collision: Laser$tick
});


function Laser$initialize(x, y, rotation) {
    Actor.prototype.initialize.apply(this, arguments);
    
    this.name = 'laser';
    this.rotation = rotation;

    this.body = new createjs.Bitmap('img/laser.png');
    this.body.x = -4;
    this.body.y = -2;
    this.addChild(this.body);

    this.lifetime = 0;
    this.speedX = Math.sin((rotation) * Math.PI / -180);
    this.speedY = Math.cos((rotation) * Math.PI / -180);

    collisionService.addActor(this, 'point');
}


function Laser$tick(event) {
    this.lifetime++;
    this.x -= this.speedX * BULLET_SPEED;
    this.y -= this.speedY * BULLET_SPEED;

    if (this.lifetime >= BULLET_LIFE_TIME)
        this.destroy();
}


function Laser$collision(event) {
    Actor.prototype.collision.apply(this, event);
    var other = event.data.other;
    if (other.name != 'hero')
        this.destroy();
}
