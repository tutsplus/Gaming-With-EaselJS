'use strict';


var actors = []
    , colliders = []
    , currentCollisions = [];

actors.name = 'actors array';
actors.name = 'colliders array';


module.exports = window.collisions = {
    addActor: collisions_add.bind(actors),
    removeActor: collisions_remove.bind(actors),
    addCollider: collisions_add.bind(colliders),
    removeCollider: collisions_remove.bind(colliders)
};


function collisions_add(obj) {
    var index = this.indexOf(obj);

    if (index !== -1) return console.warn('collisions: object already registered for collisions', this);
    return actors.push(obj);
}


function collisions_remove(obj) {
    var index = this.indexOf(obj);

    if (index === -1) return console.warn('collisions: object not registered for collisions', this);
    return this.splice(index, 1);
}

