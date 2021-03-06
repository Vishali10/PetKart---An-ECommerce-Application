const { trim } = require("lodash");
const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    maxlength: 32,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    required: false,
    trim: true,
  },
  user_desc: {
    type: String,
    trim: trim,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
 
}, {timestamps:true});

userSchema
  .virtual("password") //to store plain password
  .set(function (password) {
    this._password = password; //_password - pvt variable
    this.salt = uuidv1();
    this.encry_password = this.encrypt(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.encrypt(plainpassword) === this.encry_password;
  },
  encrypt: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto.createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
      
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("User", userSchema);
