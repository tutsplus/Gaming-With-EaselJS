'use strict';

var domReady = require('./util').domReady
    , Hero = require('./Hero')
    , actionService = require('./actions');

var c = createjs
    , hero
    , stage;


domReady(function init() {
    stage = new c.Stage('main');
    actionService.init(window, stage);
    prepareWorld();

    c.Ticker.addEventListener('tick', function() {
        stage.update();
    });
});


function prepareWorld() {
    hero = new Hero(100, 100);
    stage.addChild(hero);
}
