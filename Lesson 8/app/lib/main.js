'use strict';

var domReady = require('./util').domReady
    , Hero = require('./Hero')
    , Hero2 = require('./Hero2')
    , actionService = require('./actions');

var c = createjs
    , hero
    , hero2
    , stage;


domReady(function init() {
    actionService.init(window);
    prepareWorld();
    c.Ticker.addEventListener('tick', function() {
        stage.update();
    });
});


function prepareWorld() {
    stage = new c.Stage('main');
    hero = new Hero(100, 100);
    hero2 = new Hero2(250, 250);
    stage.addChild(hero);
    stage.addChild(hero2);
}
