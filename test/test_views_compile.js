var x = new (require("transitive"))();


exports.setUp = function(test, assert){
  process.chdir("./test/views");
  x.boot(this);
  test.finish();
};

exports["test views compile"] = function(test, assert){
  assert.ok(x.Views.compile);
  test.finish();
};

exports["test views compile paths"] = function(test, assert){
  var paths = x.Views.compile.filenamesForPaths("templates");
  assert.deepEqual(paths, [
    "templates/layout.haml",
    "templates/partial.u",
    "templates/user/profile.haml",
    "templates/whatever.md"
  ]);
  test.finish();
};

exports["test compiler will compile"] = function(test, assert){
  var functions = x.Views.compile(x.options);
  testViews(functions, assert);
  test.finish();
};

function testViews(templates, assert){
  assert.equal("Hello bob", templates.partial({name:"bob"}));
  assert.equal("<h1>Welcome</h1>", templates.whatever(""));
  assert.equal("<h1>BOB</h1>", templates["user/profile"]({name:"bob"}));
}

