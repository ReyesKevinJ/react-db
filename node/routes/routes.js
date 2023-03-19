import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/BlogController.js'
import {login, logout, register} from'../controllers/authController.js' 
const router = express.Router()
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.post('/',createBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)
//router para los metodos del controlador
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
export default router