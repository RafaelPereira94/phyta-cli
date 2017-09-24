const Tree = require('./tree.js')
const Clusters = require('./clusters')
const Node = require('./node.js')
const Info = require('./info.js')
const radix = require('./../sortingAlgorithms/radixSort.js')
const quickSort = require('./../sortingAlgorithms/quickSort.js')
const TreeRepresentation = require('./treeRepresentation.js')
const Triplet = require('./triplet.js')
const combinations = require('./../metrics/utils.js').combinations

/**
 * Constructor function to create Rooted Trees.
 * Extends Tree.
 * @class
 */
function RootedTree(){
    Tree.call(this)
    this.triplets = null

    /**
     * Creates a new Node for the tree.
     * 
     * @param {Node} parent - The parent Node or null if it doesnt have any
     * @returns {Node} - The Node created
     */
    this.createElem = function(parent){
        const n = new Node()
        if(parent != null){
            n.addParent(parent)
            parent.addChild(n)
        }
        this.addElemInfo(n)
        return n
    }

    /**
     * Processes the clusters for the tree.
     * The clusters are sorted by data both inside and outside.
     * 
     * @returns {Clusters} - Returns the Clusters for the tree.
     */
    this.getClusters = function(){
        if(this.clusters != null) return this.clusters
        const structure = new Clusters()
        let visited = []
        const tree = this.tree
        const hashtable = this.hashtable
        postorder(tree)

        function postorder(elem){
            visited.push(elem.id)
            elem.children.forEach(e => {
                if(e.children.length == 0){
                    visited.forEach(v => {
                        if(!structure.clusters.hasItem(v)){
                            structure.ids.push(v)
                            structure.clusters.setItem(v, [])
                        }
                        structure.clusters.getItem(v).push(e.id)
                    })
                    structure.ids.push(e.id)
                    structure.clusters.setItem(e.id, [e.id])
                }
                else
                    postorder(e)
            })
            visited.pop()
        }

        structure.clusters.each(c => radix(c, id => hashtable.getItem(id).data))

        quickSort(structure.ids, a => {
            let str = ''
            structure.clusters.getItem(a).forEach(id => {
                str += hashtable.getItem(id).data
            })
            return str
        })
        this.clusters = structure
        return structure
    }

    /**
     * Visits the Tree recursively and calls a function for each element.
     * 
     * @param {Element} elem - The element to visit
     * @param {Function} func - The function to be called
     */
    this.visit = function (elem, func){
        func(elem)
        elem.children.forEach(e => {
            this.visit(e, func)
        })
    }
    
    /**
     * Produces a representation of the Tree.
     * @param {any} type
     * @returns {Object} - Returns an object representing the Tree.
     */
    this.getRepresentation = function (type){
        const f = []
        let t
        this.visit(this.tree, e => {
            t = {}
            t.id = e.id
            if(e.parent == null)
                t.parent = null
            else t.parent = e.parent.id
            t.children = []
            e.children.forEach(c => t.children.push(c.id))
            f.push(t)
        })

        return new TreeRepresentation(this.id, this.format, type, f, this.hashtable.items, this.getClusters())
    }

  /**
   * Does postOrder recursion on the tree to solve the triplets.
   * 
   * @return {Array} Returns as array with the triplets.
   */
  this.getTriplets = function(){
    if(this.triplets != null) return this.triplets
      const tree = this.tree
      const hashtable = this.hashtable
      const res = []
      postorder(res, tree)

      quickSort(res, a =>{
        let str = ''
        a.double.forEach(letter =>{
          str += hashtable.getItem(letter).data
        })
        str+=hashtable.getItem(a.single).data
        return str
      })
      this.triplets = res
      return res

      function postorder(res, elem){
        let triplets = []
        elem.children.forEach(e =>{
          if(e.children.length == 0){ //no folha
            triplets.push(e.id)
          }
          else{
            triplets.push(postorder(res, e))
          }
        })

        if(triplets.length == 2){
          let p1Comb = combinations(triplets[0], 2)
          let p2Comb = combinations(triplets[1], 2)

          if(!Array.isArray(p1Comb) && !Array.isArray(p2Comb) && !Array.isArray(triplets[1]) && !Array.isArray(triplets[0]))
            return triplets

          if(!Array.isArray(triplets[0])) {
            if(Array.isArray(p2Comb)) {
              p2Comb.forEach(p1 => {
                quickSort(p1, a => hashtable.getItem(a).data)
                res.push(new Triplet(triplets[0], p1))
              })
            }
          }
          else triplets[0].forEach(p => {
            if(!Array.isArray(p2Comb)){
              if(Array.isArray(p)){ //cuidado ver este caso para ordenação
                quickSort(p,a => hashtable.getItem(a).data)
                res.push(new Triplet(p, p2Comb))
              }
            }
            else p2Comb.forEach(p1 => {
              quickSort(p1,a => hashtable.getItem(a).data)
              res.push(new Triplet(p, p1))
            })
          })

          if(!Array.isArray(triplets[1])) {
            if(Array.isArray(p1Comb)) {
              p1Comb.forEach(p1 => {
                quickSort(p1,a => hashtable.getItem(a).data)
                res.push(new Triplet(triplets[1], p1))
              })
            }
          }
          else triplets[1].forEach(p => {
            if(!Array.isArray(p1Comb)){
              if(Array.isArray(p)){
                quickSort(p,a => hashtable.getItem(p).data)
                res.push(new Triplet(p1Comb, p))
              }
            }
            else p1Comb.forEach(p1 =>{
              quickSort(p1,a => hashtable.getItem(a).data)
              res.push(new Triplet(p, p1))
            })
          })
        }
        triplets = flatten(triplets)

        return triplets
      }

      /**
       * Flatterns the Array
       * 
       * @param {Array} arr - Array to be flatten
       * @returns {Array} Returns the flatten array
       */
      function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
        }, [])
      }
    }
}

RootedTree.prototype = Object.create(Tree.prototype)
module.exports = RootedTree