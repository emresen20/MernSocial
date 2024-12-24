import express from 'express'
import {createPost, deletePost, getPosts, likePost, updatePost} from '../controllers/posts.js'
import auth from '../middlewares/auth.js';

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.post('/',auth,createPost) //authun koyulma sebebi req içinde userId bilgisini olabilmesidir
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)

export default router;