const mongoose = require('mongoose');
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority`;

async function mongodbconnect(){
   mongoose.connect( process.env.MONGOS || 'mongodb://localhost:27017/admin',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }).then(() => console.log('Connected to MongoDB using Mongoose!'))
}
module.exports={mongodbconnect}