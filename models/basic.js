module.exports = function(model){
  model || (model = {});

  model.setStore = function(store){
    this.store = store;
    return this;
  }
  
  model.load = function(id, cb){
    this.store.get(id, cb);
  };

  model.save = function(id, list, cb){
    this.store.set(id, list, cb);
  };

  model.merge = function(src, updates, cb){
    dest = {};

    for(var key in src){
      if(src.hasOwnProperty(key)){
        dest[key] = src[key];
      }else{
        console.log("source does not have own property: "+ key.toString());
      }
    }

    for(key in updates){
      if(updates.hasOwnProperty(key)){
        dest[key] = updates[key];
      }
    }

    console.log(sys.inspect(dest));
    cb(null, dest);
  };

  model.update = function(id, upd, cb){
    self = this;
    self.load(id, function(err, list){
      if(err) return cb(err);
      model.merge(list, upd, function(err, merged){
        if(err) return cb(err);
        self.save(merged.id, merged, cb);
      });
    });
  };
  
  return model;
}
