import express from 'express'
import {createPost, deletePost, getPosts, likePost, updatePost} from '../controllers/posts.js'

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)

export default router;