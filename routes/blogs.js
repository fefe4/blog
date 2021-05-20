var express = require("express");
var router = express.Router();
const blogController = require("../controllers/blogController");

function verifyToken (req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
 
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      console.log(req.token);  
      next()
    } else {
      res.sendStatus(401);
    }
  }

//Resful Routes for Blogs

//Display list of all blogs ---- INDEX

router.get("/", blogController.get_blogs);
// router.get('/', (req, res) => {
//   return res.json('Received a GET HTTP method');
// });

//Create new blog ----- NEW
router.get("/new",  verifyToken, blogController.get_new_form);

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
