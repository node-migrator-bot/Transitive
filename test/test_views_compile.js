var x = new (require("../index"))(),
    fs = require("fs");

x.options = {};

exports.setUp = function(test, assert){
  process.chdir("./test/views");
  
  x.options = x.loadOptions({});
  x.options.writeTemplates = false;
  
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
    "templates/page.haml",
    "templates/partial.u",
    "templates/stream_item.haml",
    "templates/user/profile.haml",
    "templates/whatever.md"
  ]);
  test.finish();
};

exports["test compiler will compile"] = function(test, assert){
  var functions = x.Views.compile(x.options);
  
  functions.escape = function(text) {
    return (text + "").
      replace(/&/g, "&amp;").
      replace(/</g, "&lt;").
      replace(/>/g, "&gt;").
      replace(/\"/g, "&quot;");
  };
  
  testViews(functions, assert);
  test.finish();
};

exports["test render function"] = function(test, assert){
  var functions = x.Views.compile(x.options);
  x.Views.templates = functions;
  
  var html = x.Views.render("user/profile", {name:"aaron"});
  assert.equal("<h1>AARON</h1>", html);
  
  test.finish();
};

exports["test render page"] = function(test, assert){
  var functions = x.Views.compile(x.options);
  x.Views.templates = functions;
  
  var html = x.Views.renderPage("user/profile", {name:"aaron"});
  
  assert.ok(html.match(/h1>AARON/));
  assert.ok(html.match(/pageData = \{/));
  
  test.finish();
};

exports["test renderLive"] = function(test, assert){
  var functions = x.Views.compile(x.options);
  x.Views.templates = functions;
  var user = {name:"aaron"};
  var items = [];
  items.id = "itemsId0000";
  
  var html = x.Views.renderPage("page", {user:user, items:items});
  
  console.log(html);
  
  assert.ok(html.match(/Hello aaron/));
  assert.ok(html.match(/pageData = \{/));
  
  test.finish();
};


function testViews(templates, assert){
  assert.equal("Hello bob", templates.partial({name:"bob"}));
  assert.equal("<h1>Welcome</h1>", templates.whatever(""));
  assert.equal("<h1>BOB</h1>", templates["user/profile"]({name:"bob"}));
}

