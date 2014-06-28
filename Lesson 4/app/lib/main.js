'use strict';

var domReady = require('./util').domReady
    , Hero = require('./Hero');

var c = createjs;

console.log('Game Started: EaselJS version: ' + c.EaselJS.version);


domReady(function init() {
    var stage = new c.Stage('main');

    var hero1 = new Hero('Hero 1', 50, 50);
    stage.addChild(hero1);

    var hero2 = new Hero('Hero 2', 150, 50);
    stage.addChild(hero2);

    c.Ticker.timingMode = c.Ticker.RAF;
    c.Ticker.setFPS(60);
    c.Ticker.addEventListener('tick', function(event) {
        stage.update({
            delta: event.delta
        });
    });
});
