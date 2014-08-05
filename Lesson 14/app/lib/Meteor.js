'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , Container = createjs.Container;


module.exports = createSubClass(Container, 'Meteor', {
    initialize: Meteor$initialize,
    destroy: Meteor$destroy,
    isDestroyed: Meteor$isDestroyed
});


function Meteor$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    this.name = 'meteor';
    this.x = x;
    this.y = y;
    this.rotation = Math.random()*360;
    
    this.direction = Math.random()*360;
    this.velocity = Math.random()*8 + 2;
    this.speedX = Math.sin((this.direction) * Math.PI / -180);
    this.speedY = Math.cos((this.direction) * Math.PI / -180);


    this.body = new createjs.Bitmap('img/meteor.png');
    this.body.x = -49;
    this.body.y = -48;
    this.addChild(this.body);

    collisionService.addActor(this, 'circle', {radius: 48});
    this.on('collision', onCollision);
    this.on('tick', onTick);
}


function Meteor$destroy() {
    if (this.parent) {
        collisionService.removeActor(this);
        this.parent.removeChild(this);
        this._destroyed = true;
    }
}


function Meteor$isDestroyed() {
    return this._destroyed;
}


function onTick() {
    this.x -= this.speedX * this.velocity;
    this.y -= this.speedY * this.velocity;
}


function onCollision(event) {
    var other = event.data.other;
    if (other.name == 'hero') {
        this.destroy();
    } else if (other.name == 'laser') {
        //send out message to update score
        this.destroy();
    }
}
