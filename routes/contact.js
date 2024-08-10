const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MyBlogsDB");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  query: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
