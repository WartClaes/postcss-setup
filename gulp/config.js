'use strict';

function getPath(type, target) {
    return config.general[target] + config[type][target];
}

function getDest(type) {
    return getPath(type, 'dest');
}

function getSrc(type) {
    return getPath(type, 'src');
}

var config = {
    general: {
        src: './src/',
        dest: './build/'
    },
    styles: {
        src: 'styles/main.css',
        dest: ''
    }
}

module.exports = {
    general: {
        dest: config.general.dest
    },
    styles: {
        src: getSrc('styles'),
        dest: getDest('styles')
    }
};
