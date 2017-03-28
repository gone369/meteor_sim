const path = require("path");
module.exports = {
  "name": "Meteor Sim",
  "entry": "../src/client/index.js",
  "sass_include_paths":[],
  "client":{
    "html_index_template_path":path.resolve(__dirname,"../src/client/index.ejs"),
    "favicon": path.resolve(__dirname,"../src/client/assets/favicon/favicon.ico")
  }
}
