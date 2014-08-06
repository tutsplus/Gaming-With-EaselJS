'use strict';

var Meteor = require('../Meteor');

module.exports = {
    name: 'Meteor Wave B',
    data: [                     // x    y   size
        { objClass: Meteor, args: [300, 80,  1] },
        { objClass: Meteor, args: [150, 600, 4] },
        { objClass: Meteor, args: [40,  150, 2] },
        { objClass: Meteor, args: [80,  200, 3] },
        { objClass: Meteor, args: [250, 300, 2] },
        { objClass: Meteor, args: [120, 450, 0] }
    ]
};
