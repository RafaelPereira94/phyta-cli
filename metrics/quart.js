'use strict'
const equals = require('./utils.js').equals

/**
 * Computes the Triplets metric between two trees.
 * 
 * @param {Unrooted|Forest} t1 - The first tree to compute.
 * @param {Unrooted|Forest} t2 - The second tree to compute.
 * @returns {Object} - Returns the metric distance result and the differences 
 */
module.exports = function quartet(t1, t2){
  
  const quat1 = t1.getQuartets().map(tp => tp.partition1.concat(tp.partition2))
  const quat2 = t2.getQuartets().map(tp => tp.partition1.concat(tp.partition2))

  if(quat1.length != quat2.length){
    //árvores em comparação têm de ter sempre o mesmo número de elementos a comparar
    return { error: 'Trees must have the same number of leaves!'}
  }
  let i = 0, j= 0, res = 0, dif, diffsT1 = [], diffsT2 = [], mark

  //comparar os quartets
  for(i = 0; i < quat1.length && j < quat2.length;){
    dif = equals(t1, t2, quat1[i], quat2[j])

    if(dif == 0){
      quat1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': 0})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': 0})
      })
      quat2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': 0})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': 0})
      })
      ++i, ++j, ++res
    }
    else if(dif == -1){
      quat1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': -1})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': -1})
      })
      quat2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': -1})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': -1})
      })
      ++i
    }
    else{
      quat1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': -1})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': -1})
      })
      quat2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': -1})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': -1})
      })
      ++j
    }
  }

  let r = quat1.length - res
  return r == 0 ? { 'result': r, 'diffsT1': [], 'diffsT2': [] } : { 'result': r, diffsT1, diffsT2 }
}