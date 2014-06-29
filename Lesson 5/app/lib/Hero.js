'use strict';

var createSubClass = require('./util/create_subclass')
    , Shape = createjs.Shape;


module.exports = createSubClass(Shape, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Shape.prototype.initialize.apply(this, null, x, y);
    this.x = x;
    this.y = y;
    this.name = 'hero';

    this.graphics.beginFill('green').drawRoundRect(0, 0, 50, 50, 15);
}
