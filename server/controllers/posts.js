

import PostMessage from '../models/PostMessage.js'

const getPosts= async (req,res)=>{
    try {
        const postMessage = await PostMessage.find().sort({
            createdAt:-1
        });
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const createPost= async (req,res)=>{
    const post=req.body; // req.body frondent veya postmanda veridiğimiz şeyleri yakalar

    const newPost=new PostMessage(post); //modelimizi oluşturduk buraya frontendden gelen verileri ekledik

    try {
        await newPost.save();
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}





export {
    getPosts,
    createPost
}