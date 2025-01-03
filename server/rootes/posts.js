import express from 'express'
import {createPost, deletePost, getPosts, likePost, updatePost,getPostBySearch,getPost,getPostsByTags} from '../controllers/posts.js'
import auth from '../middlewares/auth.js';

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.get('/:id',getPost)
router.get('/tags/:tags',getPostsByTags)
router.get('/search',getPostBySearch)
router.post('/',auth,createPost) //authun koyulma sebebi req içinde userId bilgisini olabilmesidir
router.patch('/:id',auth,updatePost) // auth middalewaresini yazdık
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)


export default router;