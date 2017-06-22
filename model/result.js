
/**
 * Constructor function to create a Result.
 * It represents a result of a metric.
 * @param {Number} t1 - The first tree id used for the metric
 * @param {Number} t2 - The second tree id used for the metric
 * @param {String} metric - The metric processed
 * @param {Number} result - The result of the metric
 * @class
 */
function Result(t1, t2, metric, result){
    this.tree1 = t1
    this.tree2 = t2
    this.metric = metric
    this.result = result
}

module.exports = Result