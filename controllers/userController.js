const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express ();
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;



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



app.use(passport.initialize());

exports.user_logIn = [
  body("username", "username, can not be empty ")
    .trim()
    .escape(),

  //password
  body("password", "password can not be empty")
    .trim()
    .escape(),

   function (req, res) {
    User.findOne({ 'username': req.body.username }, (err, user) => {
      if (err) { 
        return res.json(err);
      }
      if (!user) {
        return res.json( { message: "Incorrect username" });
      }
      if (user.password !== req.body.password) {
        
      }
      bcrypt.compare(req.body.password, user.password, (err, data) => {
        if (data) {
       // generate a signed son web token with the contents of user object and return it in the response
        console.log("444")
        const token = jwt.sign({username:user.username} , "your_jwt_secret");
        const a =  user.username
        return res.json({user:a , token });
        } else {
          // passwords do not match!

          return res.send("pepe")
        }
      })
      });

    }
];

// I need to pass my token as a header && and set it in local storage for React 
