var merge = require("../lib/utils/deep_merge");

exports["test deep merge is recursive"] = function(test, assert){
  
  var destination = {a:[1, 2], o:{k: "v", n:{a:[2]}}, i:4};
  
  var properties = {a:[99], o:{k:"s", b:5, n:{a:[4]}}, i:false};
  
  var obj = merge(destination, properties);
  
  assert.deepEqual(obj, {
      a:[1,2,99],
      o:{
        k:"s",
        n:{
          a:[2, 4]
        },
        b: 5
      },
      i: false
    }, 
    "deep merge should merge objects (recursively), concat arrays and override everything else"
  );

  test.finish();
}