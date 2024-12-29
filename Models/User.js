const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    user_name:  { type:String  , required:true},
    email:  { type:String  , unique:true , required:true},
    mobile:  { type:Number,required:true },
    password:  { type:String ,required:true},
});
const User = mongoose.model('User', userSchema);
module.exports = User;