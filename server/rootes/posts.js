import express from 'express'
import {createPost, getPosts} from '../controllers/posts.js'

const router=express.Router();

router.get('/',getPosts) //controllersten bu methodumuzu yazdık
router.post('/',createPost)

export default router;