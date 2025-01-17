import mongoose from 'mongoose';

import PostMessage from '../models/PostMessage.js'

const getPosts= async (req,res)=>{
    const {page}=req.query
    try {
        const LIMIT=4;
        const startIndex=(Number(page)-1)*LIMIT;
        const totalPost=await PostMessage.countDocuments({}) //db de kaç tane veri var

        const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex) //skip ile başlangıç indexini belirtir

        res.status(200).json({data:posts,currentPage:page,numberOfPage:Math.ceil(totalPost/LIMIT)})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const createPost= async (req,res)=>{
    const post=req.body; // req.body frondent veya postmanda veridiğimiz şeyleri yakalar

    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()}); //modelimizi oluşturduk buraya frontendden gelen verileri ekledik

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

    if(!req.userId) return res.json({message:'Yetkisiz Giriş'}) // bu userId authtan gelen rooteste tanınladığım

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Post bulunamadı'); // ID geçerli değilse hata döndür
    }
    const post= await PostMessage.findById(id) //idyegöre postu getiriyor

    const index=post.likes.findIndex((id)=>id===String(req.userId)) // likes dizisinde giriş yapılmış kullanıcı var mı diye bakılıyor varsa 1 yoksa -1 döner
    if(index===-1){ //eğer o idi bizim dizimizde yoksa içine push yapıyoruz
        post.likes.push(req.userId)
    }else{
        post.likes=post.likes.filter((id)=>id!==String(req.userId)) //bizim id hariç diğerlerini filtreleyip çıkarır
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.status(200).json(updatedPost)
}

const getPostBySearch=async (req,res)=>{
    const {searchQuery}=req.query //url/search?searcgQuery=post
    console.log(searchQuery)
    try {
        const title=new RegExp(searchQuery,'i')  //EMRE emre Emre hepsini otomatik olarak titleye ekler aynı olarak
       
        const posts=await PostMessage.find({ title })

        res.json({data:posts})
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error})
    }
}


const getPost=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error})
        
    }
}

const getPostsByTags=async(req,res)=>{
    const {tags}=req.params;
    try {
        const posts=await PostMessage.find({tags:{$in:tags.split(',')}})
        res.json({data:posts})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}



export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostBySearch,
    getPost,
    getPostsByTags
}