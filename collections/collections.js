module.exports.Basic = require('./basic.js');

var Stores = {};

Stores.MemoryStore = require("./stores/memory");

module.exports.Stores = Stores;

Stores.BroadcastingMemory = function(pi){
  return wrapStoreWithBroadcasting(Stores.MemoryStore, pi);
}

Stores.RedisZ = require("./stores/redis_z");
Stores.BroadcastingRedisZ = function(pi, client){
  var redis = Stores.RedisZ(client);
  return wrapStoreWithBroadcasting(redis, pi);
}


var wrapStoreWithBroadcasting = function(store, pi){
  var broadcaster = Object.create(store);
  broadcaster.push = function(id, obj, cb){
    store.push(id, obj, function(err, obj){
      if(err) return cb(err);

      pi.publish(pi.channel(id),  {
        action: "add",
        item: obj
      });

      cb(null, obj);
    })
  };

  broadcaster.remove = function(id, obj, cb){
    store.remove(id, obj, function(err, obj){
      if(err) return cb(err);
      pi.publish(pi.channel(id),  {
        action: "remove",
        item: obj
      });

      cb(null, obj);
    })
  };
  
  return broadcaster;
}

module.exports.wrapStoreWithBroadcasting = wrapStoreWithBroadcasting;