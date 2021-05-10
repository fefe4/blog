const Blogs = require('../models/blogs')

exports.get_blogs = function (req, res) {
  Blogs.find({},'title author')
    .populate('author')
    .exec(function (err, blogs) {
      res.json()
    })
}

