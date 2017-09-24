'use strict'
const equals = require('./utils.js').equals

/**
 * Computes the Quartets metric between two trees.
 * 
 * @param {Rooted} t1 - The first tree to compute.
 * @param {Rooted} t2 - The second tree to compute.
 * @returns {Object} - Returns the metric distance result and the differences 
 */
module.exports = function triplet(t1,t2){
  //Numero total de triplets - iguais entre as 2 arvores. -> valor da metrica -> logo arvores tem que ter o mesmo numero de folhas!?
  const trip1 = t1.getTriplets()
  const trip2 = t2.getTriplets()

  let tp1 = trip1.map(tp => tp.double.concat(tp.single))
  let tp2 = trip2.map(tp => tp.double.concat(tp.single))

  if(trip1.length != trip2.length){
    //árvores em comparação têm de ter sempre o mesmo número de elementos a comparar
    { error: 'Trees must have the same number of leaves!'}
  }
  let i = 0, j= 0, res = 0, dif, diffsT1 = [], diffsT2 = []
  //comparar os triplets
  for(i = 0; i < trip1.length && j < trip2.length;){
    dif = equals(t1, t2, tp1[i], tp2[j])

    if(dif == 0){
      tp1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': 0})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': 0})
      })
      tp2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': 0})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': 0})
      })
      ++i, ++j
      ++res
    }
    else if(dif == -1){
      tp1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': -1})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': -1})
      })
      tp2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': -1})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': -1})
      })
      ++i
    }
    else{
      tp1[i].forEach(id => {
        const m1 = diffsT1.find(e => e.id == id)
        if(m1 === undefined) diffsT1.push({'id': id, 'dif': -1})
        else if(m1.dif != -1) diffsT1.push({'id': id, 'dif': -1})
      })
      tp2[j].forEach(id => {
        const m2 = diffsT2.find(e => e.id == id)
        if(m2 === undefined) diffsT2.push({'id': id, 'dif': -1})
        else if(m2.dif != -1) diffsT2.push({'id': id, 'dif': -1})
      })
      ++j
    }
  }

  let r = trip1.length - res
  return r == 0 ? { 'result': r, 'diffsT1': [], 'diffsT2': [] } : { 'result': r, diffsT1, diffsT2 }
}