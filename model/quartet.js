'use strict'

/**
 * Constructor function to create new Quartet objects.
 * 
 * @param {Array} partition1 - The left side partition.
 * @param {Array} partition2 - The right side partition.
 * @constructor
 */
function Quartet(partition1, partition2) {
  this.partition1 = partition1
  this.partition2 = partition2
}

module.exports = Quartet