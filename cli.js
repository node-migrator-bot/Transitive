#!/usr/bin/env node

var merge = require('./lib/utils/deep_merge');

// my-program.js
var nopt = require("nopt"),
    path = require("path"),
    knownOpts = { 
      "root" : [path],
      "flag" : Boolean,
      "pick" : Boolean
    };

var parsed = nopt(knownOpts);
var options = {
   "root":process.cwd(),
   "ensuredirs": true
};

merge(options, parsed);
console.log(options);