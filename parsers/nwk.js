const RootedTree = require('./../model/rootedTree')
const UnrootedTree = require('./../model/unrootedTree')
const TreeForest = require('./../model/treeForest')

/*
 * The parsers object specifies the parser function to be used
 * for each type of Tree. The types are specified in the config.json file. 
 */
const parsers = {
    'rooted': parseRootedTree,
    'unrooted': parseUnrootedTree,
    'forest': parseTreeForest
}

/**
 * Parses a Tree in the newick format.
 * 
 * @param {String} str - The newick tree representation.
 * @param {String} treeType - The type of tree.
 * @returns {Tree} - Returns the Tree.
 */
module.exports = function(str, treeType) {
    return parsers[treeType](str)
}

/**
 * Parses a rooted tree in the newick format.
 * 
 * @param {String} str - The newick tree representation.
 * @returns {RootedTree} - Returns the Tree.
 * @private
 */
function parseRootedTree(str){
    const tree = new RootedTree()
    return parseTree(tree, str)
}

/**
 * Parses a unrooted tree in the newick format.
 * 
 * @param {String} str - The newick tree representation.
 * @returns {UnrootedTree} - Returns the Tree.
 * @private
 */
function parseUnrootedTree(str){
    const tree = new UnrootedTree()
    return parseTree(tree, str)
}

/**
 * Parses a tree forest in the newick format.
 * 
 * @param {String} str - The newick tree representation.
 * @returns {TreeForest} - Returns the Tree.
 * @private
 */
function parseTreeForest(str){
    const tree = new TreeForest()

    const strs = str.split(';')
    strs.pop() //remove final empty string
    strs.forEach(s => {
        tree.addTree(parseUnrootedTree(s))
    })
    return tree
}

/**
 * Parses a tree in the newick format and populates the given structure.
 * 
 * @param {Tree} structure - A Tree structure to populate.
 * @param {String} str - The newick tree representation.
 * @returns {Tree} - Returns the populated structure.
 * @private
 */
function parseTree(structure, str){
    const ancestors = []
    let firstNode = true,elem

    //converts each char into is respective token object with symbol and its type.
    function tokenizer(src,tokens){
        tokens = tokens || {
                '(': /\(/,
                ')': /\)/,
                ':': /:/,
                ';': /;/,
                ',': /,/,
                'NUMBER': /\d+\.*\d*|\.\d+/, // optional beginning 0 for decimal numbers
                'STRING': /[a-zA-Z_\+\.\\\-\d'\s\[\]\*\/{}]+/, // your mileage with this regex may vary
            };

        let classify = function(tkn) {
                var tokenClass;
                Object.keys(tokens).some(function(key) {
                    var classifier = new RegExp(tokens[key]);

                    if (tkn.match(classifier)) {
                        tokenClass = key;
                        return true;
                    }
                });

                return tokenClass;
            },
            index = 0,
            regex = "";

        // Build the regex
        Object.keys(tokens).forEach(function(key) {
            let tokenizer = tokens[key];

            if (index > 0) {
                regex += '|';
            }

            regex += '(' + tokenizer.source + ')'; // capture separating tokens for classification
            index++;
        });

        let tokenized = src.split(new RegExp(regex)),
            named = [];
        for (let i = 0; i < tokenized.length; i++) {
            let token = tokenized[i];
            if (token) { // skip undef and empty string
                named.push({
                    symbol: token,
                    type: classify(token)
                });
            }
        }
        return named; // tokens as classified symbols
    }

    let tokens = tokenizer(str)

    let currToken = tokens.shift() //removes the first elem from array and returns it.

    let accept = function(symbol) {
        if (currToken.type === symbol) {
            let returnSym = currToken.symbol;
            currToken = tokens.shift();
            return returnSym;
        }

        return false;
    }

    let expect = function(type) {
        let returnSym = currToken.symbol;

        if (accept(type)) {
            return returnSym;
        }

        throw new Error("Unexpected symbol " + returnSym + " , expected -> " + type);
    }

    let length = function() {
        if (accept(':')) {
            let len = expect('NUMBER');
            //currnode.branchlength = parseFloat(len);
            structure.setElemInfoLength(elem, parseFloat(len))
        }
        // EMPTY - optional length
    }

    let name = function() {
        let
            nodename = currToken.symbol
        if (accept('STRING') || accept('NUMBER')) {
            structure.setElemInfoData(elem, nodename)
        }
        // Else, empty - name not required

        return nodename;
    }

    let tree = function(){
        if(currToken.symbol == '(')
            subtree()

        else
            branch()

        expect(';') //terminal

        return structure
    }

    let subtree = function () {
        if(currToken.symbol == '('){
            internal()
        }
        else{
            leaf()
        }
    }

    let leaf = function () {
        elem = structure.createElem(ancestors[ancestors.length-1])
        name()
        length()
    }

    let branch = function () {
        subtree()
    }

    let branchset = function () {
        branch()
        while(accept(',')){
            branch()
        }
    }

    let internal = function () {
        if(accept('(')){
            if(firstNode){
                elem = structure.createElem(null)
                structure.tree = elem
                ancestors.push(elem)
                firstNode = false
            }else{
                //elem = structure.createElem(elem) //structure.createElem(ancestor[ancestor.length-1]) !?!?
                elem = structure.createElem(ancestors[ancestors.length-1])
                ancestors.push(elem)
            }

            branchset()

            expect(')')

            elem = ancestors.pop()
            name()
            length()

        }else{
            throw new Error('Expected (')
        }
    }

    return tree()
}

/*function parseTree(structure, str){

 const ancestors = []
 let elem = structure.createElem(null)
 structure.tree = elem

 const tokens = str.split(/\s*(;|\(|\)|,|:)\s*!/)
 for (let i = 0; i < tokens.length; i++) {
 switch (tokens[i]) {
 case '(': // new branchset
 ancestors.push(elem)
 elem = structure.createElem(elem)
 break
 case ',': // another branch
 elem = structure.createElem(ancestors[ancestors.length-1])
 break
 case ')': // optional name next
 elem = ancestors.pop()
 break
 case ':': // optional length next
 break
 default:
 const t = tokens[i-1]
 if (t == ')' || t == '(' || t == ',')
 structure.setElemInfoData(elem, tokens[i])
 else if (t == ':')
 structure.setElemInfoLength(elem, parseFloat(tokens[i]))
 }
 }
 return structure
 }*/