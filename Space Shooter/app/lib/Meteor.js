'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , hudService = require('./hud')
    , Actor = require('./abstract/Actor')
    , Container = createjs.Container;


module.exports = createSubClass(Actor, 'Meteor', {
    initialize: Meteor$initialize,
    tick: Meteor$tick,
    //collision: Meteor$collision
});


function Meteor$initialize(x, y) {
    Actor.prototype.initialize.apply(this, arguments);
    
    this.name = 'meteor';
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
}


function Meteor$tick() {
    this.x -= this.speedX * this.velocity;
    this.y -= this.speedY * this.velocity;
}


function Meteor$collision(event) {
    Actor.prototype.collision.apply(this, arguments);
    //var other = event.data.other;
    // if (other.name == 'hero') {
    //     this.destroy();
    // } else if (other.name == 'laser') {
    //     hudService.dispatchEvent({
    //         type: 'update', 
    //         data: { property: 'score', value: 10}
    //     });
    //     this.destroy();
    // }
}
