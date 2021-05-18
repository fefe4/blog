const User = require("../models/users");
const { body, validationResult } = require("express-validator");

exports.user_signUp = [
  body("username", "username, can not be empty ")
    .trim()
    .isLength({ min: 3 })
    .withMessage("must be at least 3 characters long")
    .escape(),

  //password
  body("password", "password can not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("must be at least 3 characters long")
    .matches(/[0-9]/)
    .withMessage("must contain a number")
    .matches(/[A-Z]/)
    .withMessage("must contain a capital letter")
    .escape(),

  function (req, res, next) {
    const erros = validationResult;
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      admin: false,
      birthday: req.body.Date,
    });
    if (!errors.isEmpty()) {
      res.send(erros);
    } else {
      user.save(function (err) {
        if (err) {
          return next(err);
        } else {
          res.send("user created");
        }
      });
    }
  },
];
