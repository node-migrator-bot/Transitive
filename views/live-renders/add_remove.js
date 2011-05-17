module.exports = {
  name: "addRemove",

  render: function(name, obj){
    var data = this.data, output='';

    for(var i = obj.length - 1; i >= 0; i--){
      str = $templates.render(name, obj[i]);
      data.objectsReferenced[obj[i].id] = obj[i];
      //TODO: need to pre-package this template in!!!
      str = $templates.render("addRemoveItem", {id: obj[i].id, content: str});
      output = output + str;
    }

    return output;
  },
  
  tether: function(binding){
    var elm = $('#'+binding.elmId); //wheeeeeee!
    Transitive.router.on(binding.objId, function(data){
      var str;
      if(data.action == "add"){
        str = $templates.render(binding.templateName, data.item);
        str = $templates.render("addRemoveItem", {id: data.item.id, content: str});
        elm.prepend(str);
      }else{
        elm.children("[data-item-id="+data.item.id+"]").remove();
      }
    });
  },
  
  templates: {
    "addRemoveItem" : function(locals){
      with(locals){
        return "<div data-item-id=\"" +id +"\">" +
                  content + 
                "</div>";
      }
    }
  }
}