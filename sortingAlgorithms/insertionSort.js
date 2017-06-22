'use strict'

/**
 * Insertion sort a[lo..hi], starting at dth character.
 * @param {Array} array - Array to be sorted.
 * @param {Number} lo - Lowest index to be considered in array.
 * @param {Number} hi - Highest index to be considered in array.
 * @param {Number} d - Index where the sort start on the array.
 * @param {Function} mapper - Function that maps the array values into is data.
 */
function insertion(array, lo, hi, d, mapper){
    for (let i = lo; i <= hi; i++)
        for (let j = i; j > lo && less(mapper(array[j]), mapper(array[j-1]), d); j--)
            exchange(array, j, j-1)
}

/**
 * Compares two Strings telling each one is lexicographically smallest.
 * @param {String} v - String to be compared.
 * @param {String} w - String to be compared.
 * @param {Number} d - Index to start considering on the array.
 * @returns {Boolean} - True if first String is lower or equal then second String.
 * @private
 */
function less(v, w, d) {
    for (let i = d; i < Math.min(v.length, w.length); i++) {
        if (v.charAt(i) < w.charAt(i)) return true
        if (v.charAt(i) > w.charAt(i)) return false
    }
    return v.length < w.length
}

/**
 * Swaps the array values between two indexs.
 * @param {Array} array - Array with values to be swaped.
 * @param {Number} i - Array index to be swaped.
 * @param {Number} j - Array index to be swaped.
 * @private
 */
function exchange(array, i, j){
    let aux = array[i]
    array[i] = array[j]
    array[j] = aux
}

module.exports = insertion