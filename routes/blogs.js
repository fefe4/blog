var express = require('express');
var router = express.Router();


//Display list of all blogs ---- INDEX
router.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
//Create new blog ----- NEW
router.get('/blog/new')

//Add new blog to DB ------CREATE
router.post('/blogs', (req, res) => {
  return res.send('Received a POST HTTP method');
});

//Show info about one blog -----SHOW
router.get('/blogs/:id')
 

//show Edit form for one blog ------ EDIT
router.get('blogs/:id/edit')

//Update a particular blog -------- UPDATE
router.put('/blogs/:id', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
//delete a particular blog -------- DELETE
router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
})

module.exports = router;