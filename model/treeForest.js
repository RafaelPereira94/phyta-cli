const Clusters = require('./clusters.js')
const getId = require('./treeId.js')

/**
 * Constructor function to create Tree Forest.
 * @class
 */
function TreeForest(){
    this.tree = []
    this.clusters = null
    this.id = getId()

    /**
     * Processes the clusters for the tree forest.
     * The clusters are sorted by data both inside and outside.
     * 
     * @returns {Array} - Returns an array with the Clusters for the tree forest.
     */
    this.getClusters = function(){
        if(this.clusters != null) return this.clusters

        this.clusters = new Clusters()
        this.tree.forEach(t => {
            this.clusters.addCluster(t.getClusters())
        })
        return this.clusters
    }

    /**
     * Adds an unrooted tree to the tree forest.
     * 
     * @param {UnrootedTree} tree 
     */
    this.addTree = function(tree){
        this.tree.push(tree)
    }

    /**
     * Produces a representation of the tree forest.
     * 
     * @returns {Array} - Returns an array of objects representing the tree forest.
     */
    this.getRepresentation = function (type){
        const f = []
        this.tree.forEach(t => f.push(t.getRepresentation('unrooted')))
        return {'id': this.id, 'type': type, 'trees': f}
    }

    /**
     * Returns the data of an item.
     * 
     * @param {Number} id - The id of the item
     * @returns 
     */
    this.getItemData = function(id){
        let data = null
        this.tree.forEach(t => {
            if((data = t.getItemData(id)) != null)
                return data
        })
        return data
    }

    /**
     * Returns the length of an item.
     * 
     * @param {Number} id - The id of the item
     * @returns 
     */
    this.getItemLength = function(id){
        let length = null
        this.tree.forEach(t => {
            if((length = t.getItemLength(id)) != null)
                return length
        })
        return length
    }
}

module.exports = TreeForest