import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorieSchema = new Schema({
  name: {type:String, required:true },
});

CategorieSchema
.virtual('url')
.get(function () {
  return '/categorie/' + this._id;
});

module.exports = mongoose.model('Categorie', CategorieSchema);