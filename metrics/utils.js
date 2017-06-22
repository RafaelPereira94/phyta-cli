/**
 * Compares the data of two clusters.
 * @param {Tree} t1 - Tree with information required by cluster.
 * @param {Tree} t2 - Tree with information required by cluster.
 * @param {Array} c1 - The first cluster to compare
 * @param {Array} c2 - The second cluster to compare
 * @returns {Number} - Returns: 0 if equal; 1 if c1 bigger than c2; -1 if c2 bigger than c1;
 * @private
 */
module.exports = function equals(t1,t2,c1, c2){
    let d1, d2
    for(let i = 0; i < c1.length && i < c2.length; ++i){
        d1 = t1.getItemData(c1[i]), d2 = t2.getItemData(c2[i])
        if(d1 > d2) return 1
        if(d1 < d2) return -1
    }

    if (c2.length > c1.length) {
        return -1;
    } else if (c1.length > c2.length){
        return 1;
    }
    return 0
}