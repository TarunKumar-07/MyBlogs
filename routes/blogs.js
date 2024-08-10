const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MyBlogsDB");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

const Blogs = mongoose.model("Blogs", postSchema);

module.exports = Blogs;
