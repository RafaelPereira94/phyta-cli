const Tree = require('./tree.js')
const Clusters = require('./clusters')
const Node = require('./node.js')
const Info = require('./info.js')
const radix = require('./../sortingAlgorithms/radixSort.js')
const quickSort = require('./../sortingAlgorithms/quickSort.js')
const TreeRepresentation = require('./treeRepresentation.js')

/**
 * Constructor function to create Rooted Trees.
 * Extends Tree.
 * @class
 */
function RootedTree(){
    Tree.call(this)

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
}

RootedTree.prototype = Object.create(Tree.prototype)
module.exports = RootedTree
