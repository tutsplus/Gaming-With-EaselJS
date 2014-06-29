'use strict';

var createSubClass = require('./util/create_subclass')
    , Shape = createjs.Shape;


module.exports = createSubClass(Shape, 'Diamond', {
    initialize: Diamond$initialize
});


function Diamond$initialize(x, y) {
    Shape.prototype.initialize.apply(this, null, x, y);
    this.x = x;
    this.y = y;
    this.regX = -25;
    this.regY = -25;
    this.name = 'diamond';

    this.graphics.beginFill('blue').drawCircle(0, 0, 25);
}
