var express = require("express");
var router = express.Router();
const userModel = require("./users");
const blogsModel = require("./blogs");
const contactModel = require("./contact");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get("/", async function (req, res, next) {
  const blogs = await blogsModel.find().populate("user");
  res.render("index", { blogs, loggedIn: false });
});
router.get("/blogs", isLoggedIn, async function (req, res, next) {
  const blogs = await blogsModel.find().populate("user");
  res.render("index", { blogs, loggedIn: true });
});
router.get("/register", function (req, res, next) {
  res.render("register", { loggedIn: false });
});

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", { loggedIn: false });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("blogs");
  res.render("profile", { user, loggedIn: true });
});

router.post(
  "/pimgupload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    // res.send("uploaded");
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    user.profilepicture = req.file.filename;
    await user.save();
    res.redirect("/profile");
  }
);
// 1:17
// ---------------------------------------------------------------------------------------------
router.get("/newblog", isLoggedIn, function (req, res, next) {
  res.render("newblog", { loggedIn: true });
});
router.post("/newblog", async function (req, res) {
  if (!req.body.content) {
    return res.status(400).send("Blog not created");
  }
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });

  const blog = await blogsModel.create({
    title: req.body.title,
    content: req.body.content,
    user: user._id,
  });

  user.blogs.push(blog._id);
  await user.save();
  res.redirect("/profile");
});
// router.get("/about", function (req, res, next) {
//   res.render("about");
// });
// router.get("/search", function (req, res, next) {
//   res.render("search");
// });
router.get("/contact", function (req, res, next) {
  res.render("contact", { loggedIn: true });
});
router.post("/contact", async function (req, res) {
  const contact = await contactModel.create({
    name: req.body.name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    query: req.body.query,
  });
});
router.get("/blogpost", function (req, res, next) {
  res.render("blogpost", { loggedIn: true });
});

module.exports = router;
