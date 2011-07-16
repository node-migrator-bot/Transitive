var x = new (require("../index"))(),
    fs = require("fs");

var options = {createServer:false};
var generated = process.cwd()+"/test_temp/"+require("uuid-pure").newId();
fs.mkdirSync(generated, "777");
fs.mkdirSync(generated+"/public", "777");


exports.setUp = function (test, assert) {
  process.chdir("./test/views");
  options = x.loadOptions(options);

  options.directories.generated = generated;
  options.directories.generatedPublic = generated+"/public";
  
  options.mergeDefault = false;
  x.options = options;
  console.log(x.options.createServer);
  test.finish();
};

exports["test boot can work okay"] = function(test, assert){
  console.log(x.options.createServer);
  x.boot(this, options);
  assert.ok(x.options.root);
  test.finish();
};