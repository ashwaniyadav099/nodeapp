const User = require('../Models/User')
const { ObjectId } = require('mongoose').Types;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginuser(req ,res){
    let body = req.body
     try {
        if (!body.email || !body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const user = await User.findOne({ email: body.email});
        if(!user){
            res.status(400).send('user not found')
        }
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (isMatch) {
            var token = jwt.sign({ email: body.email }, 'ashwani');
            res.status(201).json({message: token})
            
        } else {
            res.status(400).send('pasword not match')
        }
      
     } catch (error) {
         console.error('Error creating user:', error);
         res.status(400).json({ message: 'Error creating user', error: error.message });
     }
 }
async function addnewuser(req ,res){
    let body = req.body
     try {
        const saltRounds = 14; // Number of salt rounds for bcrypt
         const hashedPassword = await bcrypt.hash( body.password, saltRounds);
         const result = await User.create({
             user_name: body.name,
             email: body.email,
             mobile: body.mobile,
             password:hashedPassword,
         });
         res.status(201).json({ message: 'User created successfully' });
     } catch (error) {
         console.error('Error creating user:', error);
         res.status(400).json({ message: 'Error creating user', error: error.message });
     }
}
module.exports={
    loginuser,addnewuser,
}