'use strict';

var EventDispatcher = createjs.EventDispatcher
    , EaselEvent = createjs.Event;

var c = createjs;

var width, height, hud;

var isDirty = false;
var texts = {};
var values = {
    header: 'SPACE SHOOTER',
    health: 100,
    score: 0
};


var hudService = module.exports = {
    init: hud_init,
    get: hud_get
};


function hud_init(x, y) {
    EventDispatcher.initialize(hudService);

    width = x;
    height = y;
    hud = createHud();
    hud.on('tick', onTick);

    this.on('update', onUpdate);
}


function hud_get() {
    return hud;
}

// make update function
function hud_set(property, value) {
    values[property] = value;
    texts[property]
}

function hud_update(property, value) {
    texts[property]
}


function onUpdate(event) {
    if (!event.data) return;

    var property = event.data.property;
    var value = event.data.value;
        console.log(property, value);

    if (property && value) {
        values[property] += value;
        isDirty = true;
    }
}


function onTick() {
    if (isDirty) {
        for (var key in values) {
            console.log(key)
            if (values.hasOwnProperty(key)) {
                var textObj = texts[key];
                if (textObj) textObj.text = values[key];
            }
        }
    }
    isDirty = false;
}


function createHud() {
    var newHud = new c.Container(0, 0);
    
    texts.header = new c.Text(values.header, '16px Arial', '#CCC');
    texts.header.x = width/2 - texts.header.getMeasuredWidth()/2;
    texts.header.y = 8;
    newHud.addChild(texts.header);

    texts.score = new c.Text('SCORE: ' + values.score, '16px Arial', '#CCC');
    texts.score.x = width - texts.score.getMeasuredWidth() - 20;
    texts.score.y = 8;
    newHud.addChild(texts.score);

    texts.health = new c.Text('HEALTH: ' + values.health, '16px Arial', '#CCC');
    texts.health.x = 20;
    texts.health.y = 8;
    newHud.addChild(texts.health);

    return newHud;
}
