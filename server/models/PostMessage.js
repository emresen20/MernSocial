

import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default: () => new Date()
    },
    name:String,
    comments:{
        type:[String],
        default:[]
    }
})

const PostMessage=mongoose.model('Post',postSchema)

export default PostMessage