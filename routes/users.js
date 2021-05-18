var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/*Sign-up user*/
router.post('/sign-up',)
/*Log-in user*/
router.post('/log-in',)
/*Log-out*/
router.post('/log-out',)


