import express from 'express'
import {createPost, deletePost, getPosts, likePost, updatePost,getPostBySearch,getPost,getPostsByTags, commentPost} from '../controllers/posts.js'
import auth from '../middlewares/auth.js';

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.get('/search',getPostBySearch) // çakışmadan dolayu :id nin üstünde olmalı !!!
router.get('/:id',getPost)
router.get('/tags/:tags',getPostsByTags)

router.post('/',auth,createPost) //authun koyulma sebebi req içinde userId bilgisini olabilmesidir
router.post('/:id/commentPost',auth,commentPost)
router.patch('/:id',auth,updatePost) // auth middalewaresini yazdık
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)


export default router;