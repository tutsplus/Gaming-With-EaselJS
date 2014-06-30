'use strict';

var createSubClass = require('./util/create_subclass')
    , Tile = require('./Tile');


module.exports = createSubClass(Tile, 'Box', {
    initialize: Box$initialize
});


function Box$initialize(x, y) {
    Tile.prototype.initialize.apply(this, arguments);
    this.name = 'box';

    this.graphics.beginFill('red').drawRect(0, 0, 50, 50);
}
