'use strict';

var createSubClass = require('./util/create_subclass')
    , Tile = require('./Tile');


module.exports = createSubClass(Tile, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Tile.prototype.initialize.apply(this, arguments);
    this.name = 'hero';
    
    this.graphics.beginFill('green').drawRoundRect(0, 0, 50, 50, 15);
}
