'use strict';

var createSubClass = require('./util/create_subclass')
    , Container = createjs.Container;


module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize,
    fire: Hero$fire
});


function Hero$initialize(name, x, y) {
    Container.prototype.initialize.apply(this, arguments);
    this.name = name;
    this.x = x;
    this.y = y;

    setupDisplay.call(this);
    setupListeners.call(this);
}


function setupListeners() {
    this.on('tick', onTick);
    this.on('click', onClick);
}


function onTick(event) {
    this.y += 1;
}


function onClick(event) {
    console.log(this.name, this);
}


function setupDisplay() {
    this.body = new createjs.Shape();
    this.body.graphics.beginFill('green').drawRect(0, 0, 50, 50);
    this.addChild(this.body);
}


function Hero$fire() {
    console.log('Hero fire ' + this.name);
}
