module.exports.Basic = require('./basic.js');

var Stores = {};

Stores.MemoryStore = {
  data: {},

  get: function(id, cb){
    var ary = (this.data[id] || []);
    ary.id = id;
    cb(null, ary);
  },

  set: function(id, ary, cb){
    this.data[id] = ary;
    cb(null, ary);
  },

  push: function(id, obj, cb){
    var data = this.data;
    try{
      data[id] || (data[id] = []);
      data[id].push(obj);
      cb(null, obj);
    }catch(e){
      cb(e);
    }
  },
  
  remove: function(id, obj, cb){
    var self=this;
    this.get(id, function(err, items){
      if(err) return cb(err);
      var itemIndex = -1;
      for (var i = items.length - 1; i >= 0; i--){
        if(items[i].id == obj.id){
          itemIndex = i;
          break;
        }
      };

      if(itemIndex > -1){
        items.splice(itemIndex, 1);
        self.set(id, items, function(err, setResult){
          if(err) return cb(err);
          cb(null, obj);
        });
      }
    });
  } 
};

module.exports.Stores = Stores;

Stores.BroadcastingMemory = function(pi){
  return WrapStoreWithBroadcasting(Stores.MemoryStore, pi);
}

var WrapStoreWithBroadcasting = function(store, pi){
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

module.exports.WrapStoreWithBroadcasting = WrapStoreWithBroadcasting;