/**
 * Compares the data of two clusters.
 * @param {Tree} t1 - Tree with information required by cluster.
 * @param {Tree} t2 - Tree with information required by cluster.
 * @param {Array} c1 - The first cluster to compare
 * @param {Array} c2 - The second cluster to compare
 * @returns {Number} - Returns: 0 if equal; 1 if c1 bigger than c2; -1 if c2 bigger than c1;
 * @private
 */
function equals(t1,t2,c1, c2){
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

/**
 * Scale differences.
 *
 * @param {Number} value - The value to scale.
 * @param {Number} range1 - The range1 initial value.
 * @param {Number} range2 - The range2 initial value.
 * @returns {Number} Returns the scaled value
 */
function scaleDiff(value, range1, range2 ) {
  return ( value - range1[0] ) * ( range2[1] - range2[0] ) / ( range1[1] - range1[0] ) + range2[0]
}

/**
 * Computes combinations of the elements, k times.
 *
 * @param {Array|Number} set - Elements/Element to be combined.
 * @param {Number} k - Defines the size of the subsets.
 * @returns {Array} Retuns an array with the subsets.
 */
function combinations(set, k){
  if(!Array.isArray(set))
    return set

  let i, j, combs, head, tailcombs

  //cant combine if k is bigger then number of elements.
  if(k > set.length || k <= 0)
    return []

  //k-sized set has only 1 set
  if(k == set.length)
    return [set]

  //There is N 1-sized subsets in a N-sized set. i.e [a,b] -> [[a],[b]]
  if(k == 1)
    combs = []
  set.forEach((val,idx) =>{
    combs.push(set[idx])
  })
  return combs

  combs = []
  for(i = 0;i < set.length - k + 1;++i){
    head = set.slice(i,i+1)
    tailcombs = combinations(set.slice(i+1),k-1)
    for(j = 0; j < tailcombs.length; ++j){
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}
module.exports = {
    equals,
    combinations,
    scaleDiff
}