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
    const tLen = trees.length, matrix = []

    //does not process the last tree row because those results are already computed
    //except last vs last
    for (let i = 0; i < tLen - 1; ++i) {
        if(matrix[i] == undefined) matrix[i] = []
        for (let j = i; j < tLen; ++j) {
            if(matrix[j] == undefined) matrix[j] = []
            const results = new Array()
            metrics.forEach(m => {
                if(configService.validateMetricsForTrees(types[i], types[j], m)){
                    if(i == j){
                        results.push({metric: m, result: 0})
                    }
                    else{
                        results.push({metric: m, result: metricsFiles[m](trees[i], trees[j])})
                        matrix[j][i] = new Result(trees[j].id, trees[i].id, results)

                    }
                    matrix[i][j] = new Result(trees[i].id, trees[j].id, results)
                }
            })
        }
    }
    //to compute the last cell result -> last tree vs last tree
    const results = new Array()
    metrics.forEach(m => {
        if(configService.validateMetricsForTrees(types[tLen-1], types[tLen-1], m))
            results.push({metric: m, result: 0})
    })
    matrix[tLen-1][tLen-1] = new Result(trees[tLen-1].id, trees[tLen-1].id, results)
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