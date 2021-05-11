const Blog = require('../models/blogs');
const { body,validationResult } = require('express-validator');

exports.get_blogs = function (req, res) {
  Blogs.find({},'title author')
    .populate('author')
    .exec(function (err, blogs) {
      res.json({title:'blogs', blog_list:blogs})
    })
}

exports.post_blog = [
  body('title', 'Empty title').trim().isLength({ min: 1 }).escape(),
  body('description', 'Empty description').trim().isLength({ min: 1 }).escape(),
  body('body', 'Empty body').trim().isLength({ min: 1 }).escape(), 

  function(req, res, next) {
    const errors = validationResult(req);
    const blog = new Blog ({
      title:req.body.title,
      description:req.body.description,
      // author:"test man",
      body:req.body.body,
    })
    if (!errors.isEmpty()) {
      res.send(errors)
    }
    else {
      blog.save(function(err){
        if(err){return next(err);}
        res.send('pepe')
      })
    }
  }
]

