fs = require("fs");

var magicValues = fs.openSync(__dirname+"/../doc/api/magic_values.md", "w");

function write(txt){
  txt || (txt="")
  fs.writeSync(magicValues, txt+"\n");
}

var dir = __dirname+"/../magic_values/";


directories = require(dir+"directories.js");

write("## Directories");
write(" All directories are relative to options.root. It is included for completeness.");
write();

for(name in directories){
  write();
  write("### "+name);
  write();
  write(" * Path: options.root+/"+directories[name].path);
  write(" * Description: "+directories[name].description);
  write(" * Additional Info: "+directories[name].additionalInfo);
}

