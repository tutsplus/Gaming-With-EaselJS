'use strict';

var EaselEvent = createjs.Event;


var actors = [];


module.exports = {
    addActor: addActor,
    removeActor: removeActor,
    broadcastCollisions: broadcastCollisions
};


function addActor(obj, type, options) {
    var index = actors.indexOf(obj);

    if (index !== -1) return console.warn('collisions: object already registered for collisions', actors);
    obj._collisionInfo = {
        type: type,
        options: options
    }
    return actors.push(obj);
}


function removeActor(obj) {
    var index = actors.indexOf(obj);

    if (index === -1) return console.warn('collisions: object not registered for collisions', actors);
    delete obj._collisionInfo;
    return actors.splice(index, 1);
}


function broadcastCollisions() {
    var collisions = [];
    actors.forEach(function(obj1) {
        actors.forEach(function(obj2) {
            var obj1Info = obj1._collisionInfo;
            var obj2Info = obj2._collisionInfo;

            if (obj1 != obj2) {
                if (obj1Info.type == 'circle' && obj2Info.type == 'circle') {
                    var dist = obj1Info.options.radius + obj2Info.options.radius;
                    if (dist > _distanceBetween(obj1, obj2)) {
                        var collisionEvent = new EaselEvent('collision');
                        collisionEvent.data = {
                            self: obj1,
                            other: obj2
                        };
                        collisions.push({
                            target: obj1,
                            event: collisionEvent
                        });
                        //obj1.dispatchEvent(collisionEvent);
                    }
                }
            }
        });
    });

    collisions.forEach(function(info) {
        info.target.dispatchEvent(info.event);
    });
}

function _distanceBetween(obj1, obj2) {
    return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) 
                        + Math.pow(obj1.y - obj2.y, 2));
}

