'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , Container = createjs.Container;


module.exports = createSubClass(Container, 'Meteor', {
    initialize: Meteor$initialize,
    destroy: Meteor$destroy
});


function Meteor$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    this.name = 'meteor';
    this.x = x;
    this.y = y;

    this.body = new createjs.Bitmap('img/meteor.png');
    this.body.x = -22;
    this.body.y = -22;
    this.addChild(this.body);

    collisionService.addActor(this, 'circle', {radius: 22});
    this.on('collision', onCollision);
}


function Meteor$destroy() {
    collisionService.removeActor(this);
    this.parent.removeChild(this);
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
