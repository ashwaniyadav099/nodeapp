const crypto = require('crypto');
const User = require('../Models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
async function getalluser(req ,res){
 
        try {
            const users = await User.find({});
            return res.status(200).json(users)
        } catch (err) {
            console.error('Error fetching data:', err);
            return res.send("something went wrong")
        }
}
async function deleteuser(req ,res){
 
    try {
        let idd = req.params.id
        const users = await User.findByIdAndDelete(idd);
        res.status(200).send('your data is delete')
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.send("something went wrong")
    }

}
async function edituser(req ,res){
    try {
        const body = await req.body 
        let idd = req.params.id
        const users = await User.findByIdAndUpdate(idd ,body );
        res.status(200).send('your data is edit')
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(400).send("something went wrong")
    }
}
async function getalluserbtid(req ,res){
 
    try {
        let idd = req.params.id
        const users = await User.findById(idd);
        return res.status(200).json(users)
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.send("something went wrong")
    }

}
// async function addnewuser(req ,res){
//    let body = req.body
//     try {
//         const result = await User.create({
//             user_name: body.name,
//             email: body.email,
//             mobile: body.mobile,
//             password: body.password,
//         });
//         console.log('New User Created:', result);
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         // Handle errors (e.g., validation errors, duplicate email, etc.)
//         console.error('Error creating user:', error);
//         res.status(400).json({ message: 'Error creating user', error: error.message });
//     }
// }
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
         const id = crypto.randomBytes(10).toString('hex');
         const result = await User.create({
             id:id,
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
module.exports= {getalluser, deleteuser , edituser ,getalluserbtid,loginuser,addnewuser }