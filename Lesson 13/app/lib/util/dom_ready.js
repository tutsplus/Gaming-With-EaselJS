'use strict';


module.exports = domReady;


/**
 * Fires when dom is ready, can be used at any time as result is cached
 * @param  {Function} func callback function for when dom is ready
 * @return {Any}           returns whatever func returns
 */
function domReady(func) { // , arguments
    var self = this
        , args = Array.prototype.slice.call(arguments, 1);
    if (isReady.call(this))
        return callFunc();
    else
        document.addEventListener('readystatechange', callFunc);

    function callFunc() {
        document.removeEventListener('readystatechange', callFunc);
        return func.apply(self, args);
    }
}

domReady.isReady = isReady;


/**
 * Returns true if the dom is ready
 * @return {Boolean}
 */
function isReady() {
    var readyState = document.readyState;
    return readyState == 'loading' ? false : readyState;
}
