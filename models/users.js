const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  JoiningDate: { type: Date, default: Date.now },
  // mail: {},
  // profileimage: String,
  admin: { type: Boolean },
  birthday: { type: Date },
});

UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
