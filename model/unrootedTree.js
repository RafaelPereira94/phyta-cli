const Clusters = require('./clusters')
const Tree = require('./tree.js')
const Vertex = require('./vertex.js')
const radix = require('./../sortingAlgorithms/radixSort.js')
const quickSort = require('./../sortingAlgorithms/quickSort.js')
const TreeRepresentation = require('./treeRepresentation.js')
const Quartet = require('./quartet.js')
const combinations = require('./../metrics/utils.js').combinations

/**
 * Constructor function to create Unrooted Trees.
 * Extends Tree.
 * @class
 */
function UnrootedTree(){
    Tree.call(this)
    this.quartet = null

    /**
     * Creates a new Vertex for the tree.
     * 
     * @param {Vertex} vertex - The adjacent Vertex to this one or null if it doesnt exist
     * @returns {Vertex} - The Vertex created
     */
    this.createElem = function(vertex){
        const n =  new Vertex()
        if(vertex != null){
            n.addVertex(vertex)
            vertex.addVertex(n)
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
        const tree = this
        const keys = tree.hashtable.keys()
        quickSort(keys, id => tree.getItemData(id))
        //if the first vertex only has one adjacent vertex then we have to 
        //add it to the clusters so we dont loose it
        /*if(tree.tree.vertexes.length == 1){
            structure.clusters.setItem(tree.tree.id, [tree.tree.id])
            structure.ids.push(tree.tree.id)
        }*/
        dfs(tree.tree)

        structure.clusters.setItem(tree.tree.id, keys)
        structure.ids.push(tree.tree.id)

        quickSort(structure.ids, id => {
            let str = ''
            structure.clusters.getItem(id).forEach(i => {
                    str += tree.getItemData(i)
            })
            return str
        })

        this.clusters = structure
        return structure

        function dfs(elem){
            visited.push(elem.id)
            let aux = [elem.id]
            elem.vertexes.forEach(e => {
                if(visited.find(v => v == e.id) == undefined){
                    aux.push(e.id)
                    dfs(e)
                }
            })
            if(elem.id != tree.tree.id){
                saveCluster(aux[0], aux)
            }
        }

        
        /**
         * Always saves the smallest side - left or rigth if the split
         * 
         * @param {any} id 
         * @param {any} cluster 
         */
        function saveCluster(id, cluster){
            structure.ids.push(id)
            if(cluster.length > (keys.length / 2)){
                structure.clusters.setItem(id, keys.filter(id => !cluster.includes(id)))
            }
            else{
                quickSort(cluster, id => tree.getItemData(id))
                structure.clusters.setItem(id, cluster)
            }

        }
    }

    /**
     * Visits the Tree recursively and calls a function for each element.
     * 
     * @param {Element} elem - The element to visit
     * @param {Function} func - The function to be called
     */
    this.visit = function (elem, func){
        let visited = []
        visitAux(elem, func)

        function visitAux(elem, func){
            visited.push(elem.id)
            func(elem)
            elem.vertexes.forEach(e => {
                if(visited.find(v => v == e.id) == undefined)
                    visitAux(e, func)
            })
        }
    }

    this.getLeaves = function(){
        const leaves = []
        this.visit(this.tree, e => {
            if(e.vertexes.length == 1)
                leaves.push(e.id)
        })
        return leaves
    }

    /**
     * Produces a representation of the Tree.
     * 
     * @returns {Object} - Returns an object representing the Tree.
     */
    this.getRepresentation = function (type){
        const f = []
        this.visit(this.tree, e => {
            let t = {}
            t.id = e.id
            t.vertexes = []
            e.vertexes.forEach(v => t.vertexes.push(v.id))
            f.push(t)
        })
        const tr = new TreeRepresentation(this.id, this.format, type, f, this.hashtable.items, this.getClusters())
        return tr
    }


    /**
     * Does postOrder recursion on the tree to solve the quartets.
     * 
     * @returns {Array} Returns as array with the quartets.
     */
    this.getQuartets = function () {
        if(this.quartet != null) return this.quartet
        let visited = []
        let res = []
        const tree = this
        const hashtable = tree.hashtable
        const leaves = this.getLeaves()
        quickSort(leaves, id => tree.getItemData(id))

        dfs(tree.tree)

        quickSort(res, a => {
            let str = ''
            a.partition1.forEach(letter => str += hashtable.getItem(letter).data)
            a.partition2.forEach(letter => str += hashtable.getItem(letter).data)
            return str
        })
        this.quartet = res
        return res

        function dfs(elem){
            visited.push(elem.id)
            let aux = [elem.id]
            elem.vertexes.forEach(e => {
                if(visited.find(v => v == e.id) == undefined){
                    aux.push(e.id)
                    dfs(e)
                }
            })
            saveCluster(aux)
        }

        function saveCluster(p1){
            p1 = p1.filter(e => leaves.includes(e))
            if(p1.length == 1 || p1.length == leaves.length - 1) //se for split numa folha n dá para fazer com 2 a 2
                return
            
            quickSort(p1, a => hashtable.getItem(a).data)
            let comb1 = combinations(p1, 2)
            let comb2 = combinations(leaves.filter(id => !p1.includes(id)), 2)
            comb1.forEach(c1 => {
                comb2.forEach(c2 => {
                    if(c1[0]+c1[1] < c2[0]+c2[1]){
                        if(res.find(e => e.partition1.join('') == c1.join('') && e.partition2.join('') == c2.join('')) === undefined)
                            res.push(new Quartet(c1, c2))
                    }
                    else{
                        if(res.find(e => e.partition1.join('') == c2.join('') && e.partition2.join('') == c1.join('')) === undefined)
                            res.push(new Quartet(c2, c1))
                    }
                })
            })
        }
    }
}

UnrootedTree.prototype = Object.create(Tree.prototype)
module.exports = UnrootedTree