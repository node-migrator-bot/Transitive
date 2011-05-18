## Directories
 All directories are relative to options.root. It is included for completeness.


### views

 * Path: options.root+/views
 * Description: raw templates
 * Additional Info: Nested subdirectories will also be automatically scanned for templates

### models

 * Path: options.root+/models
 * Description: model definitions
 * Additional Info: Domain model definitions that form the basic datatypes for your application

### collections

 * Path: options.root+/collections
 * Description: collection definitions
 * Additional Info: first-class collection objects

### public

 * Path: options.root+/public
 * Description: static assets
 * Additional Info: All of the contents of this directory will be served up to http requests without any authentication or authorization required.

### clientJavascripts

 * Path: options.root+/public/javascripts
 * Description: client-only javascripts
 * Additional Info: Currently served as-is, eventually may be minified and concatenated for performance

### images

 * Path: options.root+/public/images
 * Description: images used in site design
 * Additional Info: sprites, animated gifs, lolcats, et cetera

### css

 * Path: options.root+/public/css
 * Description: static stylesheets
 * Additional Info: Currently served as-is, eventually may be minified and concatenated for performance

### generated

 * Path: options.root+/public/generated
 * Description: generated assets
 * Additional Info: Compiled templates and other automatically generated files are served here.

### liveRenders

 * Path: options.root+/live-renders
 * Description: custom live renders
 * Additional Info: Custom modules for rendering and updating live views.
