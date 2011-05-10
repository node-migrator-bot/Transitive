module.exports = {
  data: {},

  get: function(id, cb){
    cb(null, this.data[id]);
  },

  set: function(id, obj, cb){
    this.data[id] = obj;
    cb(null, obj);
  }
};