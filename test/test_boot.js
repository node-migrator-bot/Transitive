var x = new (require("transitive"))();

exports["test boot can work okay"] = function(test, assert){
  x.boot(this);
  assert.ok(x.options);
  assert.ok(x.options.root);
  
  test.finish();
};