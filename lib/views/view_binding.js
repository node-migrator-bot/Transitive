newId = require("uuid-pure").newId;

module.exports = ViewBinding = function(templateName, objId, liveRenderName){
  return {
    elmId: newId(),
    templateName: templateName,
    objId: objId,
    liveRenderName: type
  };
};