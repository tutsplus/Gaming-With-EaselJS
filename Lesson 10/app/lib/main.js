'use strict';

var domReady = require('./util').domReady
    , Hero = require('./Hero')
    , actionService = require('./actions');

var _W = 500
    , _H = 800
    , xCentre = _W / 2
    , yCentre = _H / 2
    , wWidth = 2000
    , wHeight = 2000
    , c = createjs
    , hero
    , stage
    , world
    , canvas;


domReady(function init() {
    stage = new c.Stage('main');
    canvas = stage.canvas;
    actionService.init(window, stage);
    prepareWorld();

    c.Ticker.addEventListener('tick', function() {
        cameraMove();
        updateBackground();
        stage.update();
    });
});


function prepareWorld() {
    world = new c.Container();
    world.x = 0; world.y = 0;
    stage.addChild(world);

    hero = new Hero(1000, 1900);
    world.addChild(hero);
}


function cameraMove() {
    if (wWidth > _W) {
        if (hero.x < wWidth - xCentre && hero.x > xCentre)
            world.x = -hero.x + xCentre;
        else if (hero.x >= wWidth - xCentre)
            world.x = -(wWidth - _W);
        else
            world.x = 0;
    }

    if (wHeight > _H) {
        if (hero.y < wHeight - yCentre && hero.y > yCentre)
            world.y = -hero.y + yCentre;
        else if (hero.y >= wHeight - yCentre)
            world.y = -(wHeight - _H);
        else
            world.y = 0;
    }
}


function updateBackground() {
    var x = world.x
        , y = world.y;

    canvas.style.backgroundPositionX = x + 'px';
    canvas.style.backgroundPositionY = y + 'px';
}
