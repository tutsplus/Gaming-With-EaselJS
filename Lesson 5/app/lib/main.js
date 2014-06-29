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
    , stage;

console.log('Game Started: EaselJS version: ' + c.EaselJS.version);


domReady(function init() {
    var stage = prepareWorld();
    prepareTick(stage);
});


function prepareWorld() {
    stage = new c.Stage('main');

    var map = levels[0].map;

    map.forEach(function (row, indexY) {
        row.forEach(function (tile, indexX) {
            var TileClass = classMap[tile];
            if (TileClass) {
                var newTile = new TileClass(indexX, indexY);
                stage.addChild(newTile);
                row[indexX] = newTile;
            }
        });
    });

    //window.testMap = map;
    //testMap[3][6].move(2,2);

    window.addEventListener('keydown', function(event) {
        console.log('wef')
    });

    return stage;
}


function prepareTick(stage) {
    c.Ticker.timingMode = c.Ticker.RAF;
    c.Ticker.setFPS(10);
    c.Ticker.addEventListener('tick', onTick);
}


function onTick(event) {
    stage.update();
}
