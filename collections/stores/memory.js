module.exports = {
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
}