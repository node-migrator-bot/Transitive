var Stores = {};
Stores.MemoryStore = require('./stores/memory');
Stores.RedisJSONStore = require('./stores/redis_json');

Stores.BroadcastingRedisJSON = function(pi, client){
  var redis = Stores.RedisJSONStore(client);
  return wrapStoreWithBroadcasting(redis, pi);
}

//wrap the store's `set` function with a broadcast msg.
var wrapStoreWithBroadcasting = function(store, pi){
  var broadcaster = Object.create(store);
  broadcaster.pi = pi; //or you can satisfy this later!

  broadcaster.set = function(id, obj, cb){
    var self = this;
    store.set(id, obj, function(err, obj){
      if(err) return cb(err);

      self.pi.publish(id, obj);
      cb(null, obj);
    })
  };
  
  return broadcaster;
}
module.exports.wrapStoreWithBroadcasting = wrapStoreWithBroadcasting;

module.exports = Stores;