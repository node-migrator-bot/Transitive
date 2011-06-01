module.exports = {
  name: "prepend",

  prepare: function(templateName, data){
    var itemsHtml = [];

    for(var i = data.length - 1; i >= 0; i--){
      itemsHtml.push(this.render(templateName, data[i]));
    }

    return itemsHtml.join();
  },

  update: function(event){
    this.element.prepend(Transitive.Views.render(this.templateName, event));
  }
};