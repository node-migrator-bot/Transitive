//very stupid use of redis a k/v store for JSON-encoded objects
module.exports = function(client){
  if(!client){
    var redis = require("redis");
    client = redis.createClient();
  }
  
  return { 
    client: client,
    
    get: function(id, cb){
      this.client.get(id, function(err, str){
        if(err) return cb(err);
        cb(null, JSON.parse(str));
      });
    },

    set: function(id, obj, cb){
      this.client.set(id, JSON.stringify(obj), function(err, status){
        if(err) return cb(err);
        cb(null, obj);
      });
    }
  };  
};
