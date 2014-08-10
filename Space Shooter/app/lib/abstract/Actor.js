'use strict';

// Should make Meteor not aware of scoring?

var createSubClass = require('../util/create_subclass')
    , collisionService = require('../collisions')
    , hudService = require('../hud')
    , rules = require('../rules')
    , Container = createjs.Container;


var Actor = module.exports = createSubClass(Container, 'Actor', {
    initialize: Actor$initialize,
    destroy: Actor$destroy,
    isDestroyed: Actor$isDestroyed,
    tick: Actor$tick,
    collision: Actor$collision
});


function Actor$initialize(x, y) {
    if (this.constructor == Actor) 
        return console.error('This is an abstract class and should be subclassed');

    Container.prototype.initialize.apply(this, arguments);

    this.x = x;
    this.y = y;

    this.on('collision', this.collision.bind(this));
    this.on('tick', this.tick.bind(this));
}


function Actor$destroy() {
    if (this.parent) {
        hudService.dispatchEvent({
            type: 'destroyed', 
            data: { obj: this }
        });
        collisionService.removeActor(this);
        this.parent.removeChild(this);
        this._destroyed = true;
    }
}


function Actor$isDestroyed() {
    return this._destroyed;
}


function Actor$tick() {
    // implemented in subclass
}


function Actor$collision(event) {
    console.log(event);
    try {
        console.log(event.data.self.name, event.data.other.name);
        var ruleFunc = rules.collisions[event.data.self.name]
                                       [event.data.other.name];
    } catch(e) {}
    ruleFunc && ruleFunc(event.data);
}
