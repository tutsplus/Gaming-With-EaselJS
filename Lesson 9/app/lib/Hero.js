'use strict';

var createSubClass = require('./util/create_subclass')
    , actionService = require('./actions')
    , Container = createjs.Container;

var keyActions = {
    'moveleft':  { property: 'heading', value: -1 },
    'moveright': { property: 'heading', value:  1 },
    'moveup':    { property: 'thrust', value: -1 },
    'movedown':  { property: 'thrust', value:  0.5 }
};

var SPEED = 3
    , ROT_SPEED = 3.8
    , INERTIA = 0.88
    , ROT_INERTIA = 0.8;


module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    _prepareProperties.call(this, x, y);
    _prepareBody.call(this);

    this.on('tick', onTick);
    actionService.addEventListener('fire1', function(e){console.log(e)});
}


function onTick(event) {
    this.rotation += this.vRot * ROT_SPEED; 
    this.y += this.vY;    
    this.x += this.vX;  

    _processActions.call(this);

    this.vRot += this.heading;
    this.vRot = this.vRot * ROT_INERTIA;

    var ratioX = Math.sin((this.rotation) * Math.PI / -180) * this.thrust;
    var ratioY = Math.cos((this.rotation) * Math.PI / -180) * this.thrust;
    var diffX = ratioX * SPEED;
    var diffY = ratioY * SPEED;    

    this.vX += diffX;
    this.vY += diffY;

    this.vX = this.vX * INERTIA;
    this.vY = this.vY * INERTIA;

    _mouseLook.call(this);
}


function _mouseLook() {
    var x1 = this.x
        , y1 = this.y
        , x2 = this.lookX
        , y2 = this.lookY;

    var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 90;
    //console.log('angle', angle);

    this.rotation = angle;
}


function _prepareProperties(x, y) {
    this.name = 'hero';
    this.thrust = 0;
    this.heading = 0;
    this.rotation = 0;
    this.vRot = 0;
    this.vX = 0;
    this.vY = 0;
    this.x = x;
    this.y = y;
    this.lookX = 0;
    this.lookY = 0;
}


function _prepareBody() {
    this.body = new createjs.Shape();
    this.body.graphics.beginFill('black').drawRect(-25, -25, 50, 50);
    this.addChild(this.body);
}


function _processActions() {
    var actions = actionService.get()
    this.thrust = 0;
    this.heading = 0;

    for (var key in actions) {
        if (actions.hasOwnProperty(key)) {
            var keyAction = keyActions[key];
            if (keyAction)
                this[keyAction.property] = keyAction.value;
        } 
    }

    if (actions.mouse) {
        this.lookX = actions.mouse.stageX;
        this.lookY = actions.mouse.stageY;
    }
}
