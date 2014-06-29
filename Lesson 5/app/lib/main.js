'use strict';

var domReady = require('./util').domReady
    , levels = require('./levels')
    , Hero = require('./Hero')
    , Diamond = require('./Diamond')
    , Box = require('./Box')
    , Block = require('./Block');

var classMap = {
    '1': Block,
    '2': Diamond,
    '3': Box,
    '4': Hero
};

var c = createjs
    , stage
    , mapGroup;

console.log('Game Started: EaselJS version: ' + c.EaselJS.version);


domReady(function init() {
    prepareWorld();
    stage.update();
});


function prepareWorld() {
    stage = new c.Stage('main');
    mapGroup = new c.Container();
    mapGroup.x = 50;
    mapGroup.y = 50;
    stage.addChild(mapGroup);

    var map = levels[0].map;
    var tiles = [];

    map.forEach(function (row, indexY) {
        tiles.push([]);
        row.forEach(function (tile, indexX) {
            var TileClass = classMap[tile];
            if (TileClass) {
                var newTile = new TileClass(indexX, indexY);
                mapGroup.addChild(newTile);
                tiles[indexY][indexX] = newTile;
            }
        });
    });
}
