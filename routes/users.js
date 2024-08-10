const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MyBlogsDB");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
  profilepicture: {
    type: String, // assuming the picture is stored in url or a file path
  },
  email: {
    type: String,
  },
  fullname: {
    type: String,
  },
});

userSchema.plugin(plm);
module.exports = mongoose.model("Users", userSchema);
