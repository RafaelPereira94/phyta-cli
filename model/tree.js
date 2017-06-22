const HashTable = require('./hashTable.js')
const Info = require('./info.js')
const getId = require('./treeId.js')


/**
 * Constructor function to create Trees.
 * It represents the base class for a Tree.
 * It has two properties:
 * - hashtable: It contains the Info of each Tree Element
 * - tree: The tree constructed by elements
 * @class
 */
function Tree(){
    this.hashtable = new HashTable()
    this.tree = null
    this.clusters = null
    this.id = getId()

    /**
     * Returns the number of elements of the Tree.
     * 
     * @returns {Number} - Returns the size
     */
    this.size = function(){
        return this.hashtable.length
    }

    /**
     * Sets the information object of a Tree element.
     * 
     * @param {Element} elem - The element to set the information.
     */
    this.addElemInfo = function(elem){
        this.hashtable.setItem(elem.id, new Info())
    }

    /**
     * Sets the data information of a Tree element.
     * 
     * @param {Element} elem - The element to set the data
     * @param {String|Number} data - The data to be set
     */
    this.setElemInfoData = function(elem, data){
        this.hashtable.getItem(elem.id).data = data
    }

    /**
     * Sets the length information of a Tree element.
     * 
     * @param {Element} elem - The element to set the data
     * @param {Number} length - The length to be set
     */
    this.setElemInfoLength = function(elem, length){
        this.hashtable.getItem(elem.id).length = length
    }

    /**
     * Returns the data of an item.
     * 
     * @param {Number} id - The id of the item
     * @returns 
     */
    this.getItemData = function(id){
        let item = null
        if((item = this.hashtable.getItem(id)) != null)
            return item.data
        return item
    }

    /**
     * Returns the length of an item.
     * 
     * @param {Number} id - The id of the item
     * @returns 
     */
    this.getItemLength = function(id){
        let item = null
        if((item = this.hashtable.getItem(id)) != null)
            return item.length
        return item
    }
}
module.exports = Tree