const express = require('express')
require('./db')
require('dotenv').config()
const cors = require('cors')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')


const app = express()

app.use(express.json())
app.use(cors({
    origin:'https://crud-operations-livid.vercel.app'
}))
app.use("/authentication", authRouter)
app.use('/user',userRouter)

const port = 3000
app.listen(port,()=>console.log(`server is running on ${port}`))
