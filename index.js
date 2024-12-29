    const express = require('express')
    const app = express()
    const userRouter = require('./Routes/User')
    const AuthRouter = require('./Routes/Auth')
    const {mongodbconnect} = require('./Views/Connection')
    const cors = require('cors');
    require('dotenv').config()

    app.use(cors({
        origin: '*'
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/user', userRouter)
    // app.use('/auth', AuthRouter)
    mongodbconnect()
    app.get('/',async (req, res)=>{
       res.send("your are in home page")
    })
    app.listen( process.env.PORT ,()=>{
        console.log('server is started')
    })