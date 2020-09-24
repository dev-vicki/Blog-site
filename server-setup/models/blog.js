var mongoose = require('mongoose');
var schema = mongoose.schema;

var blogSchema = new mongoose.Schema({
   title: {
      type: String,
    required: true
    },
    snippet: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
  }, { timestamps: true }); 


var Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;