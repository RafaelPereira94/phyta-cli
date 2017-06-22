const equals = require('./utils.js')
/**
 * Computes the Robinson Foulds with Lengths metric.
 * 
 * @param {Tree|TreeForest} t1 - The first tree to compute
 * @param {Tree|TreeForest} t2 - The second tree to compute
 * @returns {Number} - Returns the metric distance.
 */
module.exports = function rfLengths(t1, t2){
    const c1 = t1.getClusters(), c2 = t2.getClusters()
    const k1 = c1.ids, k2 = c2.ids //the ids are suposed to be the lca of the cluster
    let sum = 0

    for(let i = 0,j = 0;i < Math.min(k1.length,k2.length);){
        let dif = equals(t1,t2,c1.clusters.getItem(k1[i]),c2.clusters.getItem(k2[j]))
        if(dif == 0){ //sao o mesmo cluster
            sum += Math.abs(t1.getItemLength(k1[i]) - t2.getItemLength(k2[j]))
            ++i,++j
        }else if(dif == -1){
            sum += t1.getItemLength(k1[i])
            ++i
        }else{
            sum += t2.getItemLength(k2[j])
            ++j
        }
    }
    return sum
}

