'use strict';

var createSubClass = require('./util/create_subclass')
    , actionService = require('./actions')
    , Laser = require('./Laser')
    , hudService = require('./hud')
    , collisionService = require('./collisions')
    , Container = createjs.Container;

var keyActions = {
    'moveleft':  { property: 'heading', value: -1 },
    'moveright': { property: 'heading', value:  1 },
    'moveup':    { property: 'thrust', value: -1 },
    'movedown':  { property: 'thrust', value:  0.5 },
    'fire1':     { property: 'firing', value: true }
};

var SPEED = 3
    , ROT_SPEED = 3.8
    , INERTIA = 0.88
    , ROT_INERTIA = 0.8;

module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize,
    takeDamage: Hero$takeDamage
});


function Hero$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    _prepareProperties.call(this, x, y);
    _prepareBody.call(this);

    collisionService.addActor(this, 'circle', {radius: 40});
    this.on('tick', onTick);
    this.on('collision', onCollision);
}


function Hero$takeDamage(damage) {
    this.alpha = 0.5;
    this.health -= damage;
    console.log('Health now at: ' + this.health);

    var self = this;
    setTimeout(function() {
        self.alpha = 1;
    }, 2000);
}


function fireWeapon(event) {
    var laser = new Laser(this.x, this.y, this.rotation);
    var index = this.parent.getChildIndex(this);
    this.parent.addChildAt(laser, index);
}


function onTick(event) {
    this.rotation += this.vRot * ROT_SPEED; 
    this.y += this.vY;    
    this.x += this.vX;  

    var actions = _processActions.call(this);
    _processActionAnimations.call(this, actions);

    if (this.firing)
        fireWeapon.call(this);

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
}


function onCollision(event) {
    var other = event.data.other;
    if (other.name == 'meteor') {
        this.takeDamage(20);
        hudService.dispatchEvent({
            type: 'update', 
            data: { property: 'health', value: -20}
        });
    }
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
    this.health = 100;
}


function _prepareBody() {
    this.body = new createjs.Bitmap('img/hero.png');
    this.body.x = -50;
    this.body.y = -37;
    this.addChild(this.body);

    var data = {
        images: ['img/fire.png'],
        frames: { width:128, height:126, regX: 64, regY: 63 },
        animations: {
            start: [0,8, 'go'], 
            go: [9,21], 
            end: [22, 29, 'off'],
            off: [29]
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var flames = new createjs.Sprite(spriteSheet, 'start');
    flames.x = 0; flames.y = 88;
    flames.rotation = 180;
    this.flames = flames;
    flames.gotoAndStop('start');
    flames.isPlaying = false;
    this.addChild(flames);
}


function _processActions() {
    var actions = actionService.get()
    this.thrust = 0;
    this.heading = 0;
    this.firing = false;

    for (var key in actions) {
        if (actions.hasOwnProperty(key)) {
            var keyAction = keyActions[key];
            if (keyAction)
                this[keyAction.property] = keyAction.value;
        } 
    }

    return actions;
}


function _processActionAnimations(actions) {
    var flames = this.flames;

    // For anything more complicated I would extend the Sprite class
    if (actions.moveup && !flames.playing) {
        flames.playing = true;
        flames.gotoAndPlay('start');
    } else if (!actions.moveup && !actions.movedown && flames.playing) {
        flames.playing = false;
        flames.gotoAndPlay('end');
    }
}
