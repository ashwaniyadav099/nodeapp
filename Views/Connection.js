const mongoose = require('mongoose');
async function mongodbconnect(){
   mongoose.connect('mongodb://localhost:27017/admin').then(() => console.log('Connected to MongoDB using Mongoose!'))
}
module.exports={mongodbconnect}