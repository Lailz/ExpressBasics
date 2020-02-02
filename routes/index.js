const express = require("express");
const router = express.Router();

// use get method to create a Route (URL)
// First parameter is called location parameter, second is an anonymous callback function
// The callback function will run when the client requests this route
router.get("/", (req, res) => {
  // res.send("<h1>I love CODED!</h1>"); // this method sends a string to the client
  const name = req.cookies.username;
  if (!name) res.redirect("/hello");
  res.render("index", { name });
});

router.get("/hello", (req, res) => {
  const name = req.cookies.username;
  if (name) res.redirect("/");
  res.render("hello");
});

router.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/");
  // res.render("hello", { name: req.cookies.username });
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/hello");
});

module.exports = router;
