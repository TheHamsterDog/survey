import mongoose = require('mongoose');
import User from './user';
const userSchema: any = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  images: [],
  questions: [],
  responses:{
	type:Array,
	default:[] 
},
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  }
});
userSchema.index({ title: 'text', description: 'text' });
const Post: any = mongoose.model("Post", userSchema);
export default Post 
