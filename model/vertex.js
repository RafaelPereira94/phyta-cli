const Element = require('./element.js')

/**
 * Constructor function used to create Vertexes.
 * Extends Element.
 * It has one property:
 * - vertexes: An array with the Vertexes connected to this Vertex
 * @class
 */
function Vertex(){
    Element.call(this)
    this.vertexes = []

    /**
     * Adds a Vertex element to the tree
     * 
     * @param {Vertex} vertex - The Vertex to add
     */
    this.addVertex = function(vertex){
        this.vertexes.push(vertex)
    }
}

Vertex.prototype = Object.create(Element.prototype)
module.exports = Vertex