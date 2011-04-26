if(typeof(Transitive) == "undefined")
  Transitive = {};

Transitive.router = {
  callbacks: {},
  on: function(chan, callback){
    this.callbacks[chan] || (this.callbacks[chan]=[]);
    this.callbacks[chan].push(callback);
  },
  trigger: function(chan, message){
    console.log(message);
    var callbacks = this.callbacks[chan];

    if(callbacks && callbacks.length){
      for(var i = 0, l= callbacks.length; i < l; i++){
        callbacks[i](message.data);
      }
    }
  }
};


$(function(){
  pushIt = new PushIt({
    hostname: document.domain,
  	channels: $pageData.subscribe
  });

  pushIt.onMessageReceived = function(message){
    //console.log(JSON.stringify(message));
    Transitive.router.trigger(message.channel, message);
  };
  
  var elm, templateName, binding;
  for(i=0, l = $pageData.bindings.length; i < l; i++){
    binding = $pageData.bindings[i];
    $tethers[binding.bindingType](binding);
  }  
});
