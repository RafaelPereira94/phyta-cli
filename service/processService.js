'use strict'
const requireDir = require('require-dir')
const metricsFiles = requireDir('./../metrics')
const parserFile = requireDir('./../parsers')
const configService = require('./configService.js')
const Result = require('./../model/result.js')
module.exports = {
    parseTrees,
    processTrees
}

/**
 * Process trees with the valid metrics.
 * @param {Array} trees - Array with the trees to be processed by the function.
 * @param {Array} metrics - Array with the metrics used on the trees.
 * @param {Array} types - Array with the tree types.
 * @returns {Array} - Array with the results in a matrix format.
 */
function processTrees(trees, metrics, types) {

    let metricResult
    const tLen = trees.length, matrix = new Array(trees.length)
    for (let i = 0; i < tLen - 1; ++i) {
        matrix[i] = new Array(tLen).fill('n.s')
        for (let j = i + 1; j < tLen; ++j) {
            matrix[j] = new Array(tLen).fill('n.s')
            matrix[i][j] = []
            matrix[j][i] = []
            metrics.forEach(m => {
                if (configService.validateMetricsForTrees(types[i], types[j], m)) {
                    metricResult = metricsFiles[m](trees[i], trees[j])
                    matrix[i][j].push(new Result(trees[i].id, trees[j].id, m, metricResult))
                    matrix[j][i].push(new Result(trees[j].id, trees[i].id, m, metricResult))
                }
            })
        }
    }
    return matrix
}

/**
 * Parses the trees with the given parser.
 * @param {String} parser - parsers to be used.
 * @param {Array} trees - Array with the trees to be parsed.
 * @param {Array} types - Array with the tree types.
 */
function parseTrees(parser, trees, types){
    return trees.map((t, idx, arr) => parserFile[parser](t, types[idx]))
}