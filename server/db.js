const mongoose = require('mongoose')
require("dotenv").config()


mongoose.connect("mongodb+srv://Hemanth:Hemanth@cluster0.q1t0tae.mongodb.net/Practice?retryWrites=true&w=majority").
then(()=>console.log('db connected Successfully'))
.catch(err=>console.log(err))