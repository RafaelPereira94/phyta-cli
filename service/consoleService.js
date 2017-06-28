'use strict'
const configService = require('./configService.js')
const serv = require('./processService')

/**
 * Process the trees with the metrics provided.
 * @param {String} parser - Parser to be used over the trees.
 * @param {Array} trees - Array with the trees.
 * @param {Array} types - Array with the tree types.
 * @param {Array} metrics - Array with the metrics to be used.
 * @returns {Array} matrix with the metric results.
 */
module.exports = function process(parser, trees, types, metrics){

    parser = configService.validateParser(parser)
    metrics = configService.validateMetrics(metrics)
    trees = serv.parseTrees(parser, trees, types)
    return serv.processTrees(trees, metrics, types)
}