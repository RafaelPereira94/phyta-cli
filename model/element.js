'use strict'
let increment = 0

/**
 * Constructor function to create Elements.
 * It represents the base class for a Tree Element.
 * @class
 */
function Element(){
    this.id = increment++
}

module.exports = Element