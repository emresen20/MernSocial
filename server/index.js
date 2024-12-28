import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './rootes/posts.js'
import userRoutes from './rootes/users.js'

const app=express();

app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}))
app.use(cors())

app.use('/posts',postRoutes)  // routeste posts routesi için yazlan kısım
app.use('/user',userRoutes)


const MONGO_URI='mongodb+srv://emrekod01:123456789asD.@clustersocial.fqfzb.mongodb.net/SocaialDb'

const PORT=3000;

mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Veritabanı bağlantısıı başarılı ${PORT}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })