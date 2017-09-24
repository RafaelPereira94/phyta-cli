const equals = require('./utils.js').equals
const scaleDiff = require('./utils.js').scaleDiff

/**
 * Computes the Robinson Foulds with Lengths metric.
 * 
 * @param {Tree|TreeForest} t1 - The first tree to compute
 * @param {Tree|TreeForest} t2 - The second tree to compute
 * @returns {Object} - Returns the metric distance result and the differences 
 */

module.exports = function rfLengths(t1, t2){
    const c1 = t1.getClusters(), c2 = t2.getClusters()
    const k1 = c1.ids, k2 = c2.ids //the ids are the lowest common ancestor of the clusters
    let sum = 0, i = 0, j = 0, diffsT1 = [], diffsT2 = []

    for(i = 0, j = 0; i < k1.length && j < k2.length; ){
        if(k1[i] != undefined && k2[i] != undefined){//REMOVE - Phylo trees always have the same nr of nodes
            let dif = equals(t1, t2, c1.clusters.getItem(k1[i]), c2.clusters.getItem(k2[j]))
            if(dif == 0){ //same cluster
                let d = Math.abs(t1.getItemLength(k1[i]) - t2.getItemLength(k2[j]))
                sum += d
                diffsT1.push({'id': k1[i], 'dif': d})
                diffsT2.push({'id': k2[j], 'dif': d})
                ++i
                ++j
            }else if(dif == -1){
                sum += t1.getItemLength(k1[i])
                diffsT1.push({'id': k1[i], 'dif': -1})
                ++i
            }else{
                sum += t2.getItemLength(k2[j])
                diffsT2.push({'id': k2[j], 'dif': -1})
                ++j
            }
        }
    }
    for(; i < k1.length; ++i){
        let d = t1.getItemLength(k1[i])
        sum += d
        diffsT1.push({'id': k1[i], 'dif': -1})
    }
    for(; j < k2.length; ++j){
        let d = t2.getItemLength(k2[j])
        sum += d
        diffsT2.push({'id': k2[j], 'dif': -1})
    }

    const maxDiff1 = Math.max.apply(null, diffsT1.map(d => d.dif))
    const maxDiff2 = Math.max.apply(null, diffsT2.map(d => d.dif))
    diffsT1 = diffsT1.map(d => {
        if(d.dif == -1) return d
        return {'id': d.id, 'dif': scaleDiff(d.dif, [0, maxDiff1], [0, 1])} 
    })
    diffsT2 = diffsT2.map(d => { 
        if(d.dif == -1) return d
        return {'id': d.id, 'dif': scaleDiff(d.dif, [0, maxDiff2], [0, 1])} 
    })

    return sum == 0 ? { 'result': sum, 'diffsT1': [], 'diffsT2': [] } : { 'result': sum, diffsT1, diffsT2}
}

