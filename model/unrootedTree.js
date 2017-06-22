const Clusters = require('./clusters')
const Tree = require('./tree.js')
const Vertex = require('./vertex.js')
const radix = require('./../sortingAlgorithms/radixSort.js')
const quickSort = require('./../sortingAlgorithms/quickSort.js')
const TreeRepresentation = require('./treeRepresentation.js')

/**
 * Constructor function to create Unrooted Trees.
 * Extends Tree.
 * @class
 */
function UnrootedTree(){
    Tree.call(this)

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

        //add all tree items to cluster (because of forests)
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
        const tr = new TreeRepresentation(this.id, type, f, this.hashtable.items, this.getClusters())
        return tr
    }
}
UnrootedTree.prototype = Object.create(Tree.prototype)
module.exports = UnrootedTree