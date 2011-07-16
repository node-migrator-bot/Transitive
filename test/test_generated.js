var x = new (require("../index"))();
var fs = require("fs");
var folder = process.cwd()+"/test_temp/"+require("uuid-pure").newId();
var options = {};

exports.setUp = function(test, assert){
  process.chdir("./test/views");
  fs.mkdirSync(folder, "777");
  
  options = x.loadOptions({});

  options.directories.generated = folder;
  options.mergeDefault = false;
  x.options = options;
  
  test.finish();
};

exports["test generated templates"] = function (test, assert) {
  
  var functions = x.Views.compile(options);

  templates = require(folder+"/templates.js");
  
  //usually added by RenderContext, let's add it here instead.
  templates.escape = function(text) {
    return (text + "").
      replace(/&/g, "&amp;").
      replace(/</g, "&lt;").
      replace(/>/g, "&gt;").
      replace(/\"/g, "&quot;");
  };
  
  assert.equal(templates["user/profile"]({name:"aaron"}), "<h1>AARON</h1>");
  test.finish();
};
