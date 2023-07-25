import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { getImage, uploadImage } from "../controller/image-controller.js";

import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/post-controller.js";
import upload from '../utils/upload.js';
import { authenticateToken } from "../controller/jwt-controller.js";

import { addComment, getAllComments , deleteComment} from "../controller/comment-controller.js"; 
const router = express.Router();

// Routes are the endpoints of an api


router.post('/signup', signupUser);
router.post('/login', loginUser);
// 2nd argument is a middleware 
router.post('/file/upload', upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/post/delete/:id', authenticateToken, deletePost);
router.post('/comment/add', authenticateToken, addComment)
router.get('/comments/:id', authenticateToken, getAllComments)

router.delete('/comment/delete/:id', authenticateToken, deleteComment)

export default router;
