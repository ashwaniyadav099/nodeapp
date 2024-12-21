const express = require('express')
const router = express.Router()
const {loginuser,addnewuser} =  require('..//Controlers/Auth')
router.post('/login' , loginuser)
router.post('/signup' , addnewuser)
module.exports= router