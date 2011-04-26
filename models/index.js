var Stores = {};

Stores.MemoryStore = {
  data: {},

  get: function(id, cb){
    cb(null, this.data[id]);
  },

  set: function(id, obj, cb){
    this.data[id] = obj;
    cb(null, obj);
  }
};

module.exports.Stores = Stores;

module.exports.WrapStoreWithBroadcasting = function(store, pi){
  var broadcaster = Object.create(store);
  
  broadcaster.set = function(id, obj, cb){
    store.set(id, obj, function(err, obj){
      if(err) return cb(err);

      pi.publish(id, obj);
      cb(null, obj);
    })
  };
  
  return broadcaster;
}

/*
list.items_id //n3kjn3833iunk3_31

#> Lists.have_many('items');
#> Lists.have_one('creator');
#> Lists.relationships

{
  'items': {
    'kind': 'Items',
    'key' : 'items_id',
    'dependentDestroy': true
  },
  'creator':{
    'kind': 'Creator',
    'key': 'creator_id'
  }
}

// This just builds up some convienences, so this works:
Lists.load(id, {'include':{
  'items': {'category':{}},
  'creator': ''
}}, callback)

//Which calls this:
Items.load(list.items_id, {'include':{'category':{}}}, callback)

//Which calls this:
Category.load(list.items[i].category_id, {}, callback)

//Which will finally call the callback with the loaded List.


List = function(properties){
  var list = Object.create(ListPrototype);
  list.defaults();
  for(property in properties){
    this[property] = properties[property];
  }
  return list;
}

JSON.stringify(list) // properties

List.load = function(id, options){
  var relationships = Object.create(this);
  
  relationships._loaded = [];
  for(k in options.include){
    relationships[k] = Models[k].load...
    relationships.loaded.push(k);
  }

  var properties = this.get(id) // cps it
  return $.extend({}, relationships, properties);
}

*/