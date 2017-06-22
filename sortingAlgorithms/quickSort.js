'use strict'
const insertion = require('./insertionSort.js')
/** @constant
 @type {Number}
 @default
 */
const CUTOFF = 16 // cutoff to insertion sort.

/**
 * Hybrid quicksort that uses insertion sort if the array length is lower than CUTOFF for better performance.
 * @param {Array} a - Array to be sorted.
 * @param {Function} mapper - Function that maps the array values into is data.
 */
function quickSort(a, mapper){
    const l = 0, r = a.length - 1
    quick(a, l, r, mapper)
}

/**
 * Sorts the array using quicksort algorithm.
 * @param {Array} a - Array to be sorted.
 * @param {Number} left - lowest index to be considered.
 * @param {Number} right - Highest index to be considered.
 * @param {Function} mapper - Function that maps the array values into is data.
 * @private
 */
function quick(a, left, right, mapper){
    if (right <= left) return

    if(a.length < CUTOFF){
        insertion(a,left,right,0,mapper)
        return
    }
    let i
    i = partition(a, left, right, mapper)
    quick(a, left, i - 1, mapper)
    quick(a, i + 1, right, mapper)
}
/**
 * Used to find the pivot for each sub-array until all arrays contain only one element.
 * @param {Array} a - Array to be divided.
 * @param l - Lowest index to be considered in the array.
 * @param r - Highest index to be considered in the array.
 * @param {Function} mapper - Function that maps the array values into is data.
 * @returns {number} Index of the pivot.
 * @private
 */
function partition(a, l, r, mapper){
    let x = mapper(a[r])
    let i = l-1
    for(let j = l; j < r ;j++){
        if(mapper(a[j]) <= x){
            i++
            exchange(a, i, j)
        }
    }
    i++
    exchange(a, r, i)
    return i
}

/**
 * Swaps the array values between two indexs.
 * @param {Array} array - Array
 * @param {Number} i - Array index to be swaped.
 * @param {Number} j - Array index to be swaped.
 * @private
 */
function exchange(array, i, j){
    let aux = array[i]
    array[i] = array[j]
    array[j] = aux
}

module.exports = quickSort