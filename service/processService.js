'use strict'
const requireDir = require('require-dir')
const metricsFiles = requireDir('./../metrics')
const parserFile = requireDir('./../parsers')
const configService = require('./configService.js')
const Result = require('./../model/result.js')

/**
 * Process trees for the given metrics.
 * 
 * @param {String} parser - Parser used to parse the trees.
 * @param {Array} trees - Array with the trees to be processed by the function.
 * @param {Array} types - Array with the tree types.
 * @param {Array} metrics - Array with the metrics used on the trees.
 * @returns {Object} Returns the results of the process.
 */
function process(parser, trees, metrics, types){

  parser = configService.validateParser(parser)
  metrics = configService.validateMetrics(metrics)
  configService.validateTreeTypes(types)

  try{
    trees = parseTrees(parser, trees, types)
  }
  catch(e){
    throw new Error('Could not parse the trees.')
  }

  const tLen = trees.length, matrix = []

  //does not process the last tree row because those results are already computed
  for (let i = 0; i < tLen - 1; ++i) {
    if(matrix[i] == undefined) matrix[i] = []
    for (let j = i; j < tLen; ++j) {
      if(matrix[j] == undefined) matrix[j] = []
      const results = new Array()
      metrics.forEach(m => {
        if(configService.validateMetricsForTrees(types[i], types[j], m)){
          if(i == j) //For the same tree the result doesnt need to processed - they are always equal (0)
            results.push({'metric': m, 'result': {'result': 0, 'diffsT1': [], 'diffsT2': []}})
          else
            results.push({'metric': m, 'result': metricsFiles[m](trees[i], trees[j])})
        }
      })
      matrix[i][j] = new Result(trees[i].id, trees[j].id, results)
      if(i != j){
        let symmetric = results.map(r => {
          return {'metric': r.metric, 'result': {'result': r.result.result, 'diffsT1': r.result.diffsT2, 'diffsT2': r.result.diffsT1}}
        })
        matrix[j][i] = new Result(trees[j].id, trees[i].id, symmetric)
      }
    }
  }
  //to compute the last cell result -> last tree vs last tree
  const results = new Array()
  metrics.forEach(m => {
    if(configService.validateMetricsForTrees(types[tLen-1], types[tLen-1], m))
      results.push({'metric': m, 'result': {'result': 0, 'diffsT1': [], 'diffsT2': []}})
  })
  matrix[tLen-1][tLen-1] = new Result(trees[tLen-1].id, trees[tLen-1].id, results)
  return {trees, matrix}
}

/**
 * Parses the trees with the given parser.
 * 
 * @param {String} parser - Parser to be used.
 * @param {Array} trees - Array with the trees to be parsed.
 * @param {Array} types - Array with the tree types.
 */
function parseTrees(parser, trees, types){
  return trees.map((t, idx, arr) => parserFile[parser](t, types[idx]))
}


module.exports = {
  parseTrees,
  process
}