module.exports = {
  port: 3030,
  createServer:true,
  compileViews: true,
  writeTemplates:true,
  compileBrowserVersions: true,
  mixin: true,
  dumpOptions: false,
  mergeDefault:true,
  templateEngines:{
    "haml": function(source){
      return require("haml")(source, {
        escapeHtmlByDefault : true,
        customEscape: "this.escape"
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
  },
  directories:{
    templates:"templates",
    generated:"generated",
    public: "public",
    generatedPublic:"generated/public",
    liveRenders: [__dirname+"/views/live_renders"]
  },
  pushIt: {}
};