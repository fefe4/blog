const Blog = require("../models/blogs");
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/blogs");
const jwt = require('jsonwebtoken');



exports.get_blogs = function (req, res) {
  Blog.find({}, "title author")
    .populate("author")
    .exec(function (err, blogs) {
      res.json({ "title": "pepito", "blog_list": blogs});
    });
};

exports.get_new_form = function (req, res) {

  // jwt.verify(req.token, "your_jwt_secret", function(err, decoded) {
  //   if (err) {res.send(err)}
  //    // bar
  //   else {
  //     res.send(decoded)
  //   }
  // });
  console.log("pepe")
  res.send("holo")
};

exports.post_blog = [
  body("title", "Empty title").trim().isLength({ min: 1 }).escape(),
  body("description", "Empty description").trim().isLength({ min: 1 }).escape(),
  body("body", "Empty body").trim().isLength({ min: 1 }).escape(),

  function (req, res, next) {
    const errors = validationResult(req);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      // author:"test man",
      body: req.body.body,
    });
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      blog.save(function (err) {
        if (err) {
          return next(err);
        }
        res.send("pepe");
      });
    }
  },
];

exports.get_specific_blog = function (req, res) {
  Blog.findById(req.params.id)
    .populate("author")
    .exec(function (err, blog) {
      if (err) {
        return next(err);
      }
      res.json({ pepe: blog.title });
    });
};

exports.edit_blog = [
  body("title", "Empty title").trim().isLength({ min: 1 }).escape(),
  body("description", "Empty description").trim().isLength({ min: 1 }).escape(),
  body("body", "Empty body").trim().isLength({ min: 1 }).escape(),

  function (req, res, next) {
    const errors = validationResult(req);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      // author:"test man",
      body: req.body.body,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      findByIdAndUpdate(req.params.id, blog, function (err, thisblog) {
        if (err) {
          return next(err);
        }
      });
    }
  },
];

exports.delete_blog = function (req, res) {
  findByIdAndDelete(req.params.id)
}
