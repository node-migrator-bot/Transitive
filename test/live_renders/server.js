var Transitive = new (require("transitive"))();

var options = Transitive.loadOptions({root:__dirname});
options.mergeDefault = false;

// I want to use a temporary, random directory for generated files that will be cleaned up later.
var generated = __dirname+"/../../test_temp/"+require("uuid-pure").newId();
options.directories.generated = generated;
options.directories.generatedPublic = generated+"/public";
var fs = require("fs");
fs.mkdirSync(generated, "777");
fs.mkdirSync(generated+"/public", "777");
console.log("Generated directory: " + generated);


//boot transitive, compiling everything and creating server 
(function(){
  Transitive.boot(this, options);
})();

//booting does not make the server listen(). maybe i should call it "initialize" or "loadEnvironment" instead?
if("port" in process.env){
  Transitive.server.listen(process.env.port);
}else{
  Transitive.server.listen(3030);
}
console.log("Server started. listening on port " + Transitive.server.address().port);


//let's add  a home page route to the app.
Transitive.server.use(connect.router(function(app){
  app.get("/", function(req, res){
    res.writeHead(200, { 
      'Content-Type': 'text/html', 
      'Cache-Control': 'no-cache, no-store'
    });
    
    res.end(Transitive.Views.renderPage("home", {}));
  });
}));

