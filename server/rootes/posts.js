import express from 'express'
import {createPost, getPosts, updatePost} from '../controllers/posts.js'

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.post('/',createPost)
router.patch('/:id',updatePost)

export default router;