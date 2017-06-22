'use strict'

let pg = require('commander')
let fs = require('fs')
let service = require('./service/consoleService')

const dir = './trees/'

if(process.argv.length > 2) {
    pg
        .version('0.0.1')
        .option('-f, --trees <path>','File with trees to be process.') //files
        .option('-t, --types <path>','File with tree types.') //tree types
        .option('-m, --metrics <path>','File with metrics to be used.') //metrics to compare trees
        .option('-p, --parser <parser>','Parser that will parse the trees.') //tree parsers
        .option('-o, --output <path>','Output path where the results will be saved.') //output where files will be saved.
        .parse(process.argv)

    if(!(pg.trees && pg.types && pg.metrics && pg.parser && pg.output))
        throw new Error('Missing parameters! All options are required.')

    let trees,types,metrics,parser,filepath

    trees = fs.readFileSync(dir+pg.trees).toString().split('$')// get trees from files
    types = fs.readFileSync(dir+pg.types).toString().split('$')
    metrics = fs.readFileSync(dir+pg.metrics).toString().split('$')
    parser = pg.parser
    filepath = pg.output

    let results = service(parser,trees,types,metrics)

    console.log('The results are:')

    fs.writeFile(filepath+'/outputResult.json',JSON.stringify(JSON.parse(JSON.stringify(results)),null,2),'utf-8',(err =>{
        if(err) throw err
        console.log('The file was saved on '+filepath)
        process.exit(1)
    }))

}else{
    throw Error("No parameters given! Use option --help to see the parameters.")
}