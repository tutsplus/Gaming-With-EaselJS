'use strict';

var createSubClass = require('./util/create_subclass')
    , actionService = require('./actions')
    , Container = createjs.Container;


module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    this.x = x;
    this.y = y;

    this.body = new createjs.Shape();
    this.body.graphics.beginFill('black').drawRect(-25, -25, 50, 50);
    this.addChild(this.body);

    this.on('tick', onTick);
}


function onTick(event) {
    var actions = actionService.get();

    if (actions.moveright) this.x++;
    if (actions.moveleft) this.x--;
}
