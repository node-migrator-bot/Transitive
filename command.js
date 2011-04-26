#!/usr/bin/env node

var sys = require('sys'),
    inspect = sys.inspect,
    fs = require('fs'),
    path = require('path'),
    child_process = require('child_process'),
    exec = child_process.exec,
    argv = require('optimist').argv;
    
var directories = require(__dirname+"/magic_values/directories");

createDirectories = function(){
  var dir = '';
  for(var name in directories){
    dir = process.cwd() + "/" + directories[name].path;

    if(path.existsSync(dir)){
      null;
    }else{
      console.log("mkdir'ing "+ dir);
      fs.mkdirSync(dir, "777");
    }
  }
}

copyDefaultFiles = function(){
  createDirectories();
  var srcroot = __dirname+'/default/';
  var destroot = process.cwd() + "/";
  function move(src, dest){
    var str = 'cp ' + srcroot + src+' '+ destroot + dest;
    exec(str, function(err, stdout, stderr){
      if(err){
        console.log(str);
        console.log(stdout);
        console.log(stderr);
      }
    });  
  }
  
  move('views/* ', directories['views'].path);
  move('public/javascript/* ', directories['clientJavascripts'].path);
  move('public/css/* ', directories['css'].path);
  
  move('server.js ', '');
}

if(argv.mkdir && argv.mkdir != "false"){
  console.log("Creating Directories");
  createDirectories();
}

if(argv.defaults && argv.defaults != "false"){
  console.log("Creating defaults");
  copyDefaultFiles();
}

