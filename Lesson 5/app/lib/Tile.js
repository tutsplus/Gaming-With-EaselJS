'use strict';

var createSubClass = require('./util/create_subclass')
    , Shape = createjs.Shape;

var TILE_SIZE = 50;


module.exports = createSubClass(Shape, 'Tile', {
    initialize: Tile$initialize,
    move: Tile$move
});


function Tile$initialize(x, y) {
    Shape.prototype.initialize.call(this, null);
    this.move(x, y);
}


function Tile$move(x, y) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
}
