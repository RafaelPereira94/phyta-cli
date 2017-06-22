const equals = require('./utils.js')
/**
 * Computes the Robinson Foulds metric between two trees.
 *
 * @param {Tree|TreeForest} t1 - The first tree to compute
 * @param {Tree|TreeForest} t2 - The second tree to compute
 * @returns {Number} - Returns the metric distance
 */
module.exports = function rfDistance(t1, t2){
    const c1 = t1.getClusters() , c2 = t2.getClusters()
    let dif, eq = 0

    for(let i = 0, j = 0; i < c1.ids.length && j < c2.ids.length;){
        if(c1.ids[i] != undefined && c2.ids[j] != undefined){
            dif = equals(t1,t2,c1.clusters.getItem(c1.ids[i]), c2.clusters.getItem(c2.ids[j]))
            if(dif == 0){
                eq += 2
                i++
                j++
            }
            else if(dif == 1) j++
            else if(dif == -1) i++
        }
    }

    return (c1.ids.length + c2.ids.length - eq) / 2
}