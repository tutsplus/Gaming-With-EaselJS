'use strict';

// You can use what you learnt in previous lessons to progress and win levels.

var A = require('./wave_a')
    , B = require('./wave_b')
    , H = require('./home');

module.exports = [
    {
        name: 'Idiran Space',
        cellWidth: 500,
        cellHeight: 500,
        data: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,A,0,0,0,B,A,0],
            [0,0,0,A,0,0,0,0,0],
            [0,B,0,0,H,0,A,0,0],
            [0,0,B,0,0,0,0,0,0],
            [0,0,0,0,0,B,0,A,0],
            [0,0,0,A,0,0,0,0,0]
        ]
    },
    {
        name: 'The Affront',
        cellWidth: 500,
        cellHeight: 500,
        data: [
            [0,0,B,B,B,B,B,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,A,0,H,0,A,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,B,B,B,B,B,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    }
];
