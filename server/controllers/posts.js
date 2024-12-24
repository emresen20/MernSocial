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
    const { id: _id } = req.params; // Güncellenecek postun ID'si http deki id 
    const updatedPostData = req.body; // Yeni gelen post verisi body de istek atarkenki

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

const deletePost = async (req, res) => {
    const { id: _id } = req.params; // HTTP isteğindeki "id" parametresini alıyoruz
  
    // ID'nin geçerliliğini kontrol et
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: 'Geçersiz Post ID' }); // Geçerli bir MongoDB ObjectId değilse
    }
  
    try {
      // Veritabanından post'u sil
      const deletedPost = await PostMessage.findByIdAndDelete(_id);
  
      // Eğer silinmek istenen post bulunamazsa
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post bulunamadı' });
      }
  
      // Başarılı silme mesajı
      res.status(200).json({ message: 'Post başarıyla silindi' });
    } catch (error) {
      // Hata yönetimi
      res.status(500).json({ message: 'Post silinirken bir hata oluştu', error: error.message });
    }
  };



const likePost=async (req,res)=>{
    const {id} = req.params; //http istekteki iddir

    if(!req.userId) return res.json({message:'Yetkisiz Giriş'})

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Post bulunamadı'); // ID geçerli değilse hata döndür
    }
    const post= await PostMessage.findById(id) //idyegöre postu getiriyor

    const index=post.likes.findIndex((id)=>id===String(req.userId)) // likes dizisinde giriş yapılmış kullanıcı var mı diye bakılıyor varsa 1 yoksa -1 döner
    if(index===-1){
        post.likes.push(req.userId)
    }else{
        post.likes=post.likes.filter((id)=>id!==String(req.userId)) //bizim id hariç diğerlerini filtreler
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.status(200).json(updatedPost)
}




export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}