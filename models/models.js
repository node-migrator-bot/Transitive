module.exports.Stores = require('./stores.js');
module.exports.Basic = require('./basic.js');

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