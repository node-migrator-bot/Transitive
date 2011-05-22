module.exports = {
  directories:{
    templates:"templates",
    generated:"generated",
    public: "public",
    generatedPublic:"generated/public"
  },
  compileTemplates: true,
  compileBrowserVersions: true,
  mixin: true,
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