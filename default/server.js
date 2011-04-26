var x = new (require("ignore-me"));

(function(){
  x.boot( this, {
    root: __dirname
  });
})();

var clock = {
  time : new Date,
  id: newId()
};

setInterval(function(){
  clock.time = new Date;
  pi.publish(clock.id, clock );
}, 300);

var httpRoutes = function (app){
  app.get('/', function(req, res){

    res.writeHead(200, { 
      'Content-Type': 'text/html', 
      'Cache-Control': 'no-cache, no-store'
    });  

    res.end(renderPage('home', { clock : clock }));
  });
}

server.use(connect.router(httpRoutes));
