const HashTable = require('./hashTable.js')

/**
 * Constructor function to create new Cluster objects.
 * A Cluster has two properties:
 *  - clusters: The clusters stored in an hashtable
 *  - ids: The ids of the clusters in the hashtable, used for sorting the clusters
 *  @class
 */
function Clusters(){
    this.clusters = new HashTable()
    this.ids = []

    this.addCluster = function (cluster) {
        Object.assign(this.clusters.items, cluster.clusters.items)
        this.clusters.length += cluster.clusters.length
        this.ids = this.ids.concat(cluster.ids)
    }
}

module.exports = Clusters