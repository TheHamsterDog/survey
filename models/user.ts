import mongoose = require('mongoose');

const userSchema: any = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  isVerified:{
    type: Boolean, default: false
  },
  image: [] ,
 });
const model: any = mongoose.model("User", userSchema);
export default model;


