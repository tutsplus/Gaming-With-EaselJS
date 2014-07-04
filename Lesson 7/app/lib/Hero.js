'use strict';

var createSubClass = require('./util/create_subclass')
    , actionService = require('./actions')
    , Container = createjs.Container;

var keyActions = {
    'leftkey':  {property: 'rotDir', value: -1},
    'rightkey': {property: 'rotDir', value:  1},
    'upkey':    {property: 'direction', value: -1},
    'downkey':  {property: 'direction', value:  0.5}
};

var SPEED = 15
    , ROT_SPEED = 10
    , FRICTION = 0.85
    , ROT_FRICTION = 0.8;


module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    _prepareProperties.call(this, x, y);
    _prepareBody.call(this);

    this.on('tick', onTick);
    actionService.addEventListener('spacekey', function(e){console.log(e)});
}


function onTick(event) {
    var actions = actionService.get();

    _processActions.call(this, actions);
    
    this.rotDir = this.rotDir * ROT_FRICTION;
    if (Math.abs(this.rotDir) < 0.1) this.rotDir = 0;
    var rotV = this.rotDir * ROT_SPEED;

    this.direction = this.direction * FRICTION;
    if (Math.abs(this.direction) < 0.1) this.direction = 0;
    var dirV = this.direction * SPEED;

    this.rotation += rotV;

    var xVel = Math.cos((this.rotation + 90) * Math.PI / 180);
    var yVel = Math.sin((this.rotation + 90) * Math.PI / 180);

    this.x += xVel * dirV;
    this.y += yVel * dirV;
}


function _prepareProperties(x, y) {
    this.name = 'hero';
    this.rotDir = 0;
    this.direction = 0;
    this.rotation = 0;
    this.x = x;
    this.y = y;
}


function _prepareBody() {
    this.body = new createjs.Shape();
    this.body.graphics.beginFill('black').drawRect(-25, -25, 50, 50);
    this.addChild(this.body);
}


function _processActions(actions) {
    for (var key in actions) {
        if (actions.hasOwnProperty(key)) {
            var keyAction = keyActions[key];
            if (keyAction)
                this[keyAction.property] = keyAction.value;
        } 
    }
}
