'use strict';

module.exports = {
    collisions: {
        meteor: {
            hero: destroy,
            laser: destroy
        },
        hero: {
            meteor: takeDamage,
            enemy: takeDamage,
            modifier: applyModifier
        },
        laser: {
            meteor: destroy,
            enemy: destroy
        },
        enemy: {
            laser: takeDamage,
            hero: takeDamage
        },
        modifier: {
            hero: destroy
        }
    },
    destroyed: {
        meteor: addPoints,
        hero: resetGame,
        laser: noop
    }
};


function destroy(data) {
    console.log(data);
    data.self && data.self.destory && data.self.destory();
}


function takeDamage(data) {
    //use partial to pass different vals
    var self = data.self;
    self.takeDamage && self.takeDamage(20);

    if (self.health <= 0)
        self.destroy && self.destroy();
}


function applyModifier(self, other) {
    console.log('applyModifier');
}


function addPoints(self) {
    console.log('addPoints');
}


function resetGame(self) {
    console.log('resetGame');
}


function noop(self) {
    console.log('self');
}

