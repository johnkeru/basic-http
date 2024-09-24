const { Router } = require('express')
const { getPosts, renderPostForm, createPost, renderUpdateForm, updatePost, deletePost } = require('../controllers/postController')
const auth = require('../middleware/auth')

const postRouter = Router()

// pages
postRouter.get('/posts', auth, getPosts)
postRouter.get('/post-form', auth, renderPostForm)
postRouter.get('/post-form-update/:id', auth, renderUpdateForm)

// actions
postRouter.post('/post', auth, createPost)
postRouter.put('/posts/:id', auth, updatePost)
postRouter.delete('/posts/:id', auth, deletePost)

module.exports = postRouter