const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const BlogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: String,
    // comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    // votes: Number,
    // favs:  Number,
    // categorie: [{type: Schema.Types.ObjectId, ref: 'Categorie', required: true}]
    categorie: [{type: Schema.Types.ObjectId, ref: 'Categorie'}]

  });

  BlogSchema
.virtual('url')
.get(function () {
  return '/catalog/blog/' + this._id;
});

  module.exports = mongoose.model('Blog', BlogSchema);