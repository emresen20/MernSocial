import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './rootes/posts.js'

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}))
app.use(cors())

app.use('/posts',postRoutes)  // routeste posts routesi için yazlan kısım


const MONGO_URI='mongodb+srv://emrekod01:123456789asD.@clustersocial.fqfzb.mongodb.net/SocaialDb'

const PORT=6000;

mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Veritabanı bağlantısıı başarılı ${PORT}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })