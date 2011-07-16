var BASE64URICHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''); 

newId = function(len, radix) {
  var chars = BASE64URICHARS, newId = [], i=0;
  radix = radix || chars.length;
  len = len || 22;

  for (i = 0; i < len; i++) newId[i] = chars[0 | Math.random()*radix];

  return newId.join('');
};

module.exports = ViewBinding = function(templateName, objId, liveRenderName){
  return {
    elmId: newId(),
    templateName: templateName,
    objId: objId,
    liveRenderName: liveRenderName
  };
};