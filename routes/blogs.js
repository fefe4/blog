var express = require("express");
var router = express.Router();
const blogController = require("../controllers/blogController");
const passport = require ('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/users");

// function verifyToken(req, res, next) {
//   //get auth header value
//   const bearerHeader = req.headers["authorization"];

//   //check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     console.log(bearerToken);
//     req.token = bearerToken;

//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: "your_jwt_secret",
//     },
    
      
//     function (jwtPayload, cb) {
//       console.log(jwtPayload)
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return User.findById(jwtPayload.id)
//         .then((user) => {
//           console.log(user)
//           return cb(null, user);
          
//         })
//         .catch((err) => {
//           return cb(err);
//         });
//     }

//   )
// );

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_jwt_secret",
}, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

//Resful Routes for Blogs

//Display list of all blogs ---- INDEX

router.get("/", blogController.get_blogs);
// router.get('/', (req, res) => {
//   return res.json('Received a GET HTTP method');
// });

//Create new blog ----- NEW
router.get("/new", passport.authenticate('jwt', {session:false}), blogController.get_new_form);

//Add new blog to DB ------CREATE
router.post("/", blogController.post_blog);

//Show info about one blog -----SHOW
router.get("/:id", blogController.get_specific_blog);

//show Edit form for one blog ------ EDIT
router.get("/:id/edit");

//Update a particular blog -------- UPDATE
router.put("/:id", blogController.edit_blog);

//delete a particular blog -------- DELETE
router.delete("/:id", blogController.delete_blog);

module.exports = router;
