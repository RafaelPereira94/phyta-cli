const equals = require('./utils.js').equals
/**
 * Computes the Robinson Foulds metric between two trees.
 *
 * @param {Tree|TreeForest} t1 - The first tree to compute
 * @param {Tree|TreeForest} t2 - The second tree to compute
 * @returns {Object} - Returns the metric distance result and the differences 
 */
module.exports = function rfDistance(t1, t2){
    const c1 = t1.getClusters() , c2 = t2.getClusters()
    let dif, eq = 0, i = 0, j = 0, diffsT1 = [], diffsT2 = []

    for(; i < c1.ids.length && j < c2.ids.length;){
        if(c1.ids[i] != undefined && c2.ids[j] != undefined){ //REMOVE - Phylo trees always have the same nr of nodes
            dif = equals(t1, t2, c1.clusters.getItem(c1.ids[i]), c2.clusters.getItem(c2.ids[j]))
            if(dif == 0){
                eq += 2
                diffsT1.push({'id': c1.ids[i], 'dif': 0})
                diffsT2.push({'id': c2.ids[j], 'dif': 0})
                i++
                j++
            }
            else if(dif == 1) { 
                diffsT2.push({'id': c2.ids[j], 'dif': -1})
                j++
            }
            else if(dif == -1) {
                diffsT1.push({'id': c1.ids[i], 'dif': -1})
                i++ 
            }
        }
    }
    for(; i < c1.ids.length; ++i){
        diffsT1.push({'id': c1.ids[i], 'dif': -1})
    }
    for(; j < c2.ids.length; ++j){
        diffsT2.push({'id': c2.ids[j], 'dif': -1})
    }

    let r = (c1.ids.length + c2.ids.length - eq) / 2
    return r == 0 ? { 'result': r, 'diffsT1': [], 'diffsT2': [] } : { 'result': r, diffsT1, diffsT2 }
}