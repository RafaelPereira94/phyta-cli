'use strict'
const insertion = require('./insertionSort.js')
/** @constant
 @type {Number}
 @default
 */
const R = 256;   // extended ASCII alphabet size
/** @constant
 @type {Number}
 @default
 */
const CUTOFF =  16;   // cutoff to insertion sort

/**
 * Rearranges the array.
 * @param {Array} arr - Array to be sorted.
 * @param {Function} mapper - Functions that maps the array values into is data.
 */
function radixSort(arr, mapper) {
    const N = arr.length
    let aux = new Array(R)
    aux = aux.splice(0, N)
    sorting(arr, 0, N - 1, 0, aux, mapper)
}

/**
 * Sorts from array[lo] to array[hi] starting at dth char.
 * @param {Array} array - Array to be sorted.
 * @param {Number} lo - Lowest index used to define subArray to be sorted.
 * @param {Number} hi - Highest index used to define subArray to be sorted.
 * @param {Number} d - Index of the array to start sorting.
 * @param {Array} aux - Auxiliary array with all ascii characters.
 * @param {Function} mapper - Function that maps the array values into is data.
 * @private
 */
function sorting(array, lo, hi, d, aux, mapper){

    if(hi <= lo+CUTOFF){
        insertion(array, lo, hi, d, mapper)
        return
    }

    let count = []
    count.length = R+2
    count = count.slice(0, R+2).fill(0)

    // compute frequency counts
    for (let i = lo; i <= hi; i++) {
        let c = charAt(mapper(array[i]), d) //ascii code c->
        count[c+2]++
    }

    // transform counts to indicies
    for (let r = 0; r < R+1; r++)
        count[r+1] += count[r]

    // distribute
    for (let i = lo; i <= hi; i++) {
        let c = charAt(mapper(array[i]), d)
        aux[count[c+1]++] = array[i]
    }

    // copy back
    for (let i = lo; i <= hi; i++)
    {
        array[i] = aux[i - lo]
    }

    // recursively sort for each character (excludes sentinel -1)
    for (let r = 0; r < R; r++)
        sorting(array, lo + count[r], lo + count[r+1] - 1, d+1, aux, mapper)
}

/**
 * Return dth character of a string.
 * @param {String} str - A String.
 * @param {Number} d - An integer between 0 and 1-less-than the length of the string.
 * @returns {String|Number} A string representing the character at the specified index;Returns -1 if d = length of string.
 * @private
 */
function charAt(str, d) {
    if (d === str.length) return -1
    return str.charAt(d).charCodeAt(0)
}

module.exports = radixSort