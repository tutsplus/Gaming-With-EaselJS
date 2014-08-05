'use strict';

var EaselEvent = createjs.Event;


var actors = []
    , colliders = [];

actors.name = 'actors array';
colliders.name = 'colliders array';


module.exports = {
    addActor: collection_add.bind(actors),
    removeActor: collection_remove.bind(actors),
    addCollider: collection_add.bind(colliders),
    removeCollider: collection_remove.bind(colliders),
    broadcastCollisions: broadcastCollisions
};


function collection_add(obj, type, options) {
    var index = this.indexOf(obj);

    if (index !== -1) return console.warn('collisions: object already registered for collisions', this);
    obj._collisionInfo = {
        type: type,
        options: options
    }
    return this.push(obj);
}


function collection_remove(obj) {
    var index = this.indexOf(obj);

    if (index === -1) return console.warn('collisions: object not registered for collisions', this);
    delete obj._collisionInfo;
    return this.splice(index, 1);
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
                } else if (obj1Info.type == 'point' && obj2Info.type == 'circle') {
                    dist = obj2Info.options.radius;
                } else if (obj1Info.type == 'circle' && obj2Info.type == 'point') {
                    dist = obj1Info.options.radius;
                }

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

