'use strict';

var domReady = require('./util').domReady
    , Meteor = require('./Meteor')
    , Hero = require('./Hero')
    , actionService = require('./actions')
    , levels = require('./levels')
    , hud = require('./hud')
    , collisionService = require('./collisions');

var _W = 500
    , _H = 700
    , xCentre = _W / 2
    , yCentre = _H / 2
    , wWidth = 2000
    , wHeight = 2000
    , currentLevel = 0
    , c = createjs
    , hero
    , stage
    , world
    , canvas;


domReady(function init() {
    stage = new c.Stage('main');
    canvas = stage.canvas;
    actionService.init(window, stage);
    hud.init(_W, _H);
    prepareWorld();

    c.Ticker.addEventListener('tick', function() {
        cameraMove();
        updateBackground();
        collisionService.broadcastCollisions();
        stage.update();
    });
});


function prepareWorld() {
    world = new c.Container();
    world.x = 0; world.y = 0;
    stage.addChild(world);
    stage.addChild(hud.get());

    var level = levels[currentLevel+1];
    wHeight = level.data.length * level.cellHeight;
    wWidth = level.data[0].length * level.cellWidth;

    level.data.forEach(function(row, rowIndex) {
        row.forEach(function(cell, cellIndex) {
            if (cell) {
                console.log('Building cell: ' + cell.name);
                
                var xOffset = cellIndex * level.cellWidth;
                var yOffset = rowIndex * level.cellHeight;
                
                cell.data.forEach(function(item) {
                    var C = item.objClass;
                    var args = [C].concat(item.args);
                    var inst = new (C.bind.apply(C, args));
                    inst.x = inst.x + xOffset;
                    inst.y = inst.y + yOffset;
                    if (C == Hero) {
                        hero = inst;
                        window.hero = inst;
                    }
                    world.addChild(inst);
                });
            }
        });
    });
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

    canvas.style.backgroundPositionX = x/2 + 'px';
    canvas.style.backgroundPositionY = y/2 + 'px';
}
