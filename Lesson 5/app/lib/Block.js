'use strict';

var createSubClass = require('./util/create_subclass')
    , Shape = createjs.Shape;


module.exports = createSubClass(Shape, 'Block', {
    initialize: Block$initialize
});


function Block$initialize(x, y) {
    Shape.prototype.initialize.apply(this, null, x, y);
    this.x = x;
    this.y = y;
    this.name = 'block';

    this.graphics.beginFill('black').drawRect(0, 0, 50, 50);
}
