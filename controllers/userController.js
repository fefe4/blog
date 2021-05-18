const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
    const errors = validationResult(req);
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      }
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        admin: false,
        birthday: req.body.Date,
      });
      if (!errors.isEmpty()) {
        res.send(errors);
      } else {
        user.save(function (err) {
          if (err) {
            return next(err);
          } else {
            res.send("user created");
          }
        });
      }
    });
  },
];

// exports.user_logIn = 