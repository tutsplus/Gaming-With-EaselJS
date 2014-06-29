'use strict';

var createSubClass = require('./util/create_subclass')
    , Shape = createjs.Shape;


module.exports = createSubClass(Shape, 'Box', {
    initialize: Box$initialize
});


function Box$initialize(x, y) {
    Shape.prototype.initialize.apply(this, null, x, y);
    this.x = x;
    this.y = y;
    this.name = 'box';

    this.graphics.beginFill('red').drawRect(0, 0, 50, 50);
}
