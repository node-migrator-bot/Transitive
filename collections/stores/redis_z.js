module.exports = function(pi, client){
  client || (client = require('redis').createClient());
  return {
      client: client,
      
      load: function(id, cb){
        this.client.zrange(id, 0, 1000, cb);
      },
      
      push: function(key, item, cb){
        var index = Date.parse((new Date).toISOString());
        this.client.zadd(key, index, item.id, function(err, cnt){
          if(err) return cb(err);
          cb(null, item);
        });
      }
    }
}