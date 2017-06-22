/**
 * Constructor function used to create an HashTable.
 * An HashTable has two properties:
 * - length: The number of items of the HashTable
 * - items: The items of the HashTable
 * @class
 */
function HashTable()
{
    this.length = 0
    this.items = {}

    /**
     * Sets an item to the HashTable.
     * 
     * @param {any} key - The item key
     * @param {any} value - The item value
     * @returns {any} - Returns the item inserted
     */
    this.setItem = function(key, value)
    {
        this.length++
        this.items[key] = value
        return this.items[key]
    }

    /**
     * Gets the item with the specified key.
     * 
     * @param {any} key - The item key
     * @returns {any} - Returns the item
     */
    this.getItem = function(key) {
        return this.items[key]
    }


    /**
     * Checks if the HashTable contains the item specified by the given key.
     * 
     * @param {any} key - The item key
     * @returns {Boolean} - Returns true if the item exists
     */
    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key)
    }
   
    /**
     * Removes the item specified by the given key.
     * 
     * @param {any} key - The item key
     * @returns {any} - Returns the previous item or undefined if it doesnt exist
     */
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key]
            this.length--
            delete this.items[key]
            return previous
        }
        else {
            return undefined
        }
    }

    /**
     * Returns all the keys that exist in the HashTable.
     *
     * @returns {Array} - Returns the array of keys
     */
    this.keys = function()
    {
        var keys = []
        for (var k in this.items) {
            keys.push(Number(k))
        }
        return keys
    }

    /**
     * Returns all the item values that exist in the HashTable.
     * 
     * @returns {Array} - Returns an array of values
     */
    this.values = function()
    {
        var values = []
        for (var k in this.items) {
            values.push(this.items[k])
        }
        return values
    }

    /**
     * Executes a function for each item value that exists.
     * 
     * @param {Function} fn - The function to be called
     */
    this.each = function(fn) {
        for (var k in this.items) {
            fn(this.items[k])
        }
    }

    /**
     * Clears the HashTable.
     * 
     */
    this.clear = function()
    {
        this.items = {}
        this.length = 0
    }
}

module.exports = HashTable