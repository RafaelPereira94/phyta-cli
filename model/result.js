'use strict'
/**
 * Constructor function to create a Result.
 * It represents a result of a metric.
 * @param {Number} t1 - The first tree id used for the metric
 * @param {Number} t2 - The second tree id used for the metric
 * @param {Array} results - Array with objects containing the metric name and the result
 * @class
 */
function Result(t1, t2, results){
    this.tree1 = t1
    this.tree2 = t2
    this.results = results
}

module.exports = Result