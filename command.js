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

var help = function(){
  console.log("Commands: ")
  for (var i = opts.length - 1; i >= 0; i--){
    console.log("    --" +opts[i][0]," ", opts[i][1]);
  };
}

var opts = [
  ["mkdir", "create directories", createDirectories],
  ["defaults", "create defaults", copyDefaultFiles],
  ["h", "help", help]
]

var arg = '';

for (var i = opts.length - 1; i >= 0; i--){
  arg = argv[opts[i][0]];
  if(arg && arg != "false"){
    opts[i][2](arg)
  }
};

