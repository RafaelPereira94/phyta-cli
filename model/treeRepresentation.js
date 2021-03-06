
/**
 * Returns a tree representation.
 * Useful to store in the database or show the client.
 * 
 * @param {Number} treeId - The id of the tree
 * @param {String} format - The input tree
 * @param {String} treeType - The type of the tree
 * @param {Array} treeElements - An array an Element objects
 * @param {Object} elementsInfo - An object with the info of every element
 * @param {CLusters} clusters - The clusters of the tree
 */
function TreeRepresentation(treeId, format, treeType, treeElements, elementsInfo, clusters){
    this.id = treeId,
    this.format = format,
    this.type = treeType,
    this.tree = {
        'elements': treeElements,
        'info': elementsInfo,
        'clusters': clusters
    }
}

module.exports = TreeRepresentation