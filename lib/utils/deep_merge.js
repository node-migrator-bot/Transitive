var innerMerge = function(destination, properties){
  if(Array.isArray(destination)){
    return destination.concat(properties);
  }
  
  if(typeof(destination) == "object"){
    var ret = {};
    for(var key in properties){
      if(properties.hasOwnProperty(key)){
        ret[key] = innerMerge(destination[key], properties[key]);
      }
    }

    return ret;
  }
  
  return properties;
};

merge = function(destination, properties){
  var obj = destination;
  
  for(var name in properties){
    if(properties.hasOwnProperty(name)){
      obj[name] = innerMerge(obj[name], properties[name]);
    }
  }
  
  return obj;
};


module.exports = merge;