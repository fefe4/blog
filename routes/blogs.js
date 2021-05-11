var express = require('express');
var router = express.Router();
const blogController = require('../controllers/blogController')

//Resful Routes for Blogs

//Display list of all blogs ---- INDEX

router.get('/', blogController.get_blogs)
// router.get('/', (req, res) => {
//   return res.json('Received a GET HTTP method');
// });
 
//Create new blog ----- NEW
router.get('/new', blogController.get_new)

//Add new blog to DB ------CREATE
router.post('/', blogController.post_blog)

//Show info about one blog -----SHOW
router.get('/:id', blogController.)
 

//show Edit form for one blog ------ EDIT
router.get('/:id/edit')

//Update a particular blog -------- UPDATE
router.put('/:id', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
//delete a particular blog -------- DELETE
router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
})

module.exports = router;