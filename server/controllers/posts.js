import mongoose from 'mongoose';

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

const updatePost = async (req, res) => {
    const { id: _id } = req.params; // Güncellenecek postun ID'si
    const updatedPostData = req.body; // Yeni gelen post verisi

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Post bulunamadı'); // ID geçerli değilse hata döndür
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            updatedPostData,
            { new: true } // Güncellenmiş postu döndür
        );

        if (!updatedPost) {
            return res.status(404).send('Post bulunamadı'); // Post mevcut değilse hata döndür
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu', error });
    }
};




export {
    getPosts,
    createPost,
    updatePost
}