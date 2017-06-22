const Element = require('./element.js')

/**
 * Constructor function used to create Nodes.
 * Node extends Element.
 * It has two properties:
 * - children: An array with the children Nodes of this Node
 * - parent: The parent of this Node. null if it has no parent (Root Node)
 * @class
 */
function Node(){
    Element.call(this)
    this.children = []
    this.parent = null

    /**
     * Adds a child to the node.
     * @param {Node} child - The child to be added
     */
    this.addChild = function(child){
        this.children.push(child)
    }

    /**
     * Specifies the parent of the node.
     * 
     * @param {Element} parent - The parent node
     */
    this.addParent = function(parent){
        this.parent = parent
    }
}

Node.prototype = Object.create(Element.prototype)
module.exports = Node