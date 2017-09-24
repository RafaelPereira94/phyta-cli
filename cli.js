#!/usr/bin/env node
'use strict'

let pg = require('commander')
let fs = require('fs')
let service = require('./service/processService').process

if(process.argv.length > 2) {
    pg
      .version('0.0.2')
      .option('-l, --path <path>', 'Path to the files to be processed')
      .option('-f, --trees <filename>', 'File with trees to be process.') //files
      .option('-t, --types <filename>', 'File with tree types.') //tree types
      .option('-m, --metrics <filename>', 'File with metrics to be used.') //metrics to compare trees
      .option('-p, --parser <parser>', 'Parser that will parse the trees.') //tree parsers
      .option('-o, --output <filename>', 'Output filename where the results will be saved.') //output where files will be saved.
      .parse(process.argv)

  if(!(pg.path && pg.trees && pg.types && pg.metrics && pg.parser && pg.output))
    throw new Error('Missing parameters! All options are required.')

    let path,trees,types,metrics,parser,filepath

    path = pg.path
    trees = fs.readFileSync(path + pg.trees).toString().split('$')// get trees from files
    types = fs.readFileSync(path + pg.types).toString().split('$')
    metrics = fs.readFileSync(path + pg.metrics).toString().split('$')
    parser = pg.parser
    filepath = pg.output

    let results = service(parser,trees,metrics,types)
    results.trees = results.trees.map((tree,idx) =>{
      return tree.getRepresentation(types[idx])
    })

  fs.writeFile(
    path + filepath + '.json',
    JSON.stringify(JSON.parse(JSON.stringify(results)), null, 2),
    'utf-8',
    (err => {
      if(err) throw err
      console.log('The file was saved on ' + path)
      process.exit(1)
    })
  )
}else{
    throw Error("No parameters given! Use option --help to see the parameters.")
}