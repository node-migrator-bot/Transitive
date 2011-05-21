module.exports = {
  directories:{
    templates:"templates",
    generated:"generated"
  },
  compileTemplates: true,
  templateEngines:{
    "haml": function(source){
      return require("haml")(source, {
        escapeHtmlByDefault : true
      });
    },
    "u" : function(source){
      return require("underscore").template(source);
    },
    "md" : function(source){
      var html = require("markdown").markdown.toHTML(source);
      var str = JSON.stringify(html);
      return new Function("return "+str);
    }
  }
};