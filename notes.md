Design of LiveRenders
  Single File?
    {
      prepare: function(templateName, data){ return html;},
      update: function(data){ /* no return needed */ },
      templates: {
        "name" : function(locals){
          return html;
        }
      }
    }
    
  Multi-File?
    index.js
      module.exports = { name:"blah" };
    prepare.js
      module.exports = function(templateName, data){ return html; };
    update.js
      module.exports = function(data) { /* no return needed * / }
    templates/
      blah.haml
      blahblah.haml