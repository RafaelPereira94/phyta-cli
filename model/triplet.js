'use strict'

/**
 * Constructor function to create new Triplet objects.
 * 
 * @param double {Array} - The double partition.
 * @param single {Number} - The single partition.
 * @constructor
 */

function Triplet(single, double){
  this.double = double
  this.single = single
}

module.exports = Triplet