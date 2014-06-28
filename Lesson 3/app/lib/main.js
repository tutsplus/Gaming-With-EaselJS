'use strict';

var domReady = require('./util').domReady;

var c = createjs;

console.log('Game Started: EaselJS version: ' + c.EaselJS.version);


domReady(function init() {
    var stage = new c.Stage("main");
    var circle = new c.Shape();
    circle.graphics.beginFill("green").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();


    //shape, bitmap and display object
});
