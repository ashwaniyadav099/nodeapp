const mongoose = require('mongoose');
require('dotenv').config()

async function mongodbconnect(){
   mongoose.connect( process.env.MONGOS ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }).then(() => console.log('Connected to MongoDB using Mongoose!')).catch((error)=>{
      console.log(error)
   })
}
module.exports={mongodbconnect}