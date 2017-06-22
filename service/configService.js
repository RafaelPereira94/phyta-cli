const fs = require('fs')
let config
/**
 * Checks if the client is using a valid parser.
 * @param {String} parser - Parser name to be used.
 * @throws {Error} - Will throw an error if parser is not on configuration file.
 * @returns {String} Returns String if the parser is valid.
 */
function validateParser(parser){
    if(config == null)
        readConfigFile()
    const parserObj = config.parsers.find(p => p.id == parser)
    if(parserObj == undefined)
        throw new Error('Invalid parser')
    return parserObj.parser
}

/**
 * Checks if the metrics are valid.
 * @param {Array} metrics - Collection of metrics to be used.
 * @throws {Error} - Will throw an error if any of metric is not valid(not found on configuration file).
 * @returns {Array} - Returns array with the valid metrics.
 */
function validateMetrics(metrics){
    if(config == null)
        readConfigFile()
    
    const mts = []
    metrics.forEach(m => {
        const metricObj = config.metrics.find(metric => metric.id == m)
        if(metricObj == undefined)
            throw new Error('Invalid metric')
        mts.push(metricObj.metric)
    })

    return mts
}

/**
 * Checks if the tree types are valid.
 * @param {Array} types - Collection of types to be used.
 * @throws {Error} - Will throw an error if any of the types is not valid (not found on configuration file).
 */
function validateTreeTypes(types){
    if(config == null)
        readConfigFile()
    
    types.forEach(t => {
        if(config.trees.find(tree => tree.id == t) == undefined)
            throw new Error('Invalid tree type')
    })
}

/**
 * Checks if both tree can be process with same metric.
 * @param {String} treeType1 - The tree type(rooted,unrooted...).
 * @param {String} treeType2 - The tree type(rooted,unrooted...).
 * @param {String} metric - metric to be used on both trees.
 * @returns {boolean} Returns true both tree can process same metric, false if cant.
 */
function validateMetricsForTrees(treeType1, treeType2, metric){
    if(config == null)
        readConfigFile()

    const metricObj1 = config.trees.find(t => t.id == treeType1).accepts.find(m => m == metric)
    if(metricObj1 == undefined)
        return false
    const metricObj2 = config.trees.find(t => t.id == treeType2).accepts.find(m => m == metric)
    if(metricObj2 == undefined)
        return false
    return true
}
/**
 * Loads configuration file.
 */
function readConfigFile() {
    config = JSON.parse(fs.readFileSync(__dirname + '/../config.json'))
}

module.exports = {
    validateMetrics,
    validateParser,
    validateTreeTypes,
    validateMetricsForTrees
}