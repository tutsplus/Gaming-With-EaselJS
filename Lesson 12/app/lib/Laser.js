'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , Container = createjs.Container;

var BULLET_SPEED = 25
    , BULLET_LIFE_TIME = 20;

module.exports = createSubClass(Container, 'Laser', {
    initialize: Laser$initialize,
    destroy: Laser$destroy
});


function Laser$initialize(x, y, rotation) {
    Container.prototype.initialize.apply(this, arguments);
    
    this.name = 'laser';
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.body = new createjs.Bitmap('img/laser.png');
    this.body.x = -4;
    this.body.y = -2;
    this.addChild(this.body);

    this.lifetime = 0;
    this.speedX = Math.sin((rotation) * Math.PI / -180);
    this.speedY = Math.cos((rotation) * Math.PI / -180);

    collisionService.addActor(this, 'point');
    this.on('collision', onCollision);
    this.on('tick', onTick);
}


function Laser$destroy() {
    collisionService.removeActor(this);
    this.parent.removeChild(this);
}


function onTick(event) {
    this.lifetime++;
    this.x -= this.speedX * BULLET_SPEED;
    this.y -= this.speedY * BULLET_SPEED;

    if (this.lifetime >= BULLET_LIFE_TIME)
        this.destroy();
}


function onCollision(event) {
    var other = event.data.other;
    if (other.name != 'hero')
        this.destroy();
}
