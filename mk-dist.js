#!/usr/bin/env node

const fs = require('fs');
           
const MAIN = [
   /* "llvm-as.js",
    "llvm-dis.js", */
    "utility.js",
    "settings.js",
    "framework.js",
    "modules.js",
    "parseTools.js",
    "intertyper.js",
    "analyzer.js",
    "jsifier.js",
    "compiler.js"
];

const PP = ["runtime.js", "library.js", "library_browser.js",
            "preamble.js", "postamble.js", "shell.js"];

function concatenate(pre, filenames, outfilename) {
    var cat = [pre, ...filenames.map(fn => fs.readFileSync(fn, 'utf-8'))];
    fs.writeFileSync(outfilename, cat.join('\n'));
}

function process(infilename, outfilename) {
    fs.writeFileSync(outfilename, processMacros(preprocess(fs.readFileSync(infilename, 'utf-8'))));
}

function preload(filenames) {
    var files = {};
    for (let fn of filenames) files[fn] = fs.readFileSync(fn, 'utf-8');
    return `const FILES = ${JSON.stringify(files)};`;
}

//concatenate(['settings.js', 'utility.js', 'parseTools.js'], 'pp-parseTools.js');
//const {preprocess, processMacros} = require('./pp-parseTools');



//for (let fn of PP)
//    process(fn, `pp-${fn}`);

concatenate(preload(PP), MAIN, 'llvm.js');
