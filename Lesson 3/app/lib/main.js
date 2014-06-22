'use strict';

var c = createjs;

console.log('Game Started: EaselJS version: ' + c.EaselJS.version);

window.onload = function onLoad() {
    var stage = new c.Stage("main");
    var circle = new c.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
}
