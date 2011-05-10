module.exports = {
  "views" : {
    path: "views",
    description: "raw templates",
    additionalInfo: "Nested subdirectories will also be automatically scanned for templates"
  },
  "models" : {
    path: "models",
    description: "model definitions",
    additionalInfo: "Domain model definitions that form the basic datatypes for your application"
  },
  "collections" : {
    path: "collections",
    description: "collection definitions",
    additionalInfo: "first-class collection objects"
  },
  "public": {
    path: "public",
    description: "static assets",
    additionalInfo: "All of the contents of this directory will be served up to http requests without any authentication or authorization required."
  },
  "clientJavascripts":{
    path: "public/javascripts",
    description: "client-only javascripts",
    additionalInfo: "Currently served as-is, eventually may be minified and concatenated for performance"
  },
  "images":{
    path: "public/images",
    description: "images used in site design",
    additionalInfo: "sprites, animated gifs, lolcats, et cetera"
  },
  "css":{
    path: "public/css",
    description: "static stylesheets",
    additionalInfo: "Currently served as-is, eventually may be minified and concatenated for performance"
  },
  "generated":{
    path: "public/generated",
    description: "generated assets",
    additionalInfo: "Compiled templates and other automatically generated files are served here.",
    gitignore: true
  },
  "liveRenders":{
    path: "live-renders",
    description: "custom live renders",
    additionalInfo: "Custom modules for rendering and updating live views."
  }
}