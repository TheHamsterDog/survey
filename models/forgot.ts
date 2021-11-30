import mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
const tokenModule:any = mongoose.model("forgot", tokenSchema);
export default  tokenModule;