module.exports = function(collection){
  collection || (collection = {});
  
  collection.setStore = function(store){
    this.store = store;
    return this;
  };
  
  collection.push = function(id, obj, cb){
    this.store.push(id, obj, cb);
  };

  collection.remove = function(id, obj, cb){
    this.store.remove(id, obj, cb);
  };

  collection.load = function(id, cb){
    this.store.get(id, cb);
  };
  
  return collection;
}