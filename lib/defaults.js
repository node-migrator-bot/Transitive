module.exports = {
  compileBrowserVersions: true,
  compileViews: true,
  createServer:true,
  dumpOptions: false,
  loadControllers: true,
  mergeDefault:true,
  mixin: true,
  port: 3030,
  writeTemplates:true,
  directories:{
    controllers: "controllers",
    generated:"generated",
    generatedPublic:"generated/public",
    public: "public",
    templates:"templates",
    liveRenders: [__dirname+"/views/live_renders", "live_renders"]
  },
  pushIt: {},
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
  }
};