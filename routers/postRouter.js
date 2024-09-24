const { Router } = require('express')
const { getPosts, renderPostForm, createPost, renderUpdateForm, updatePost, deletePost } = require('../controllers/postController')

const postRouter = Router()

app.get('/posts', getPosts)
app.get('/post-form', renderPostForm)
app.post('/post', createPost)
app.get('/post-form-update/:id', renderUpdateForm)
app.put('/posts/:id', updatePost)
app.delete('/posts/:id', deletePost)

module.exports = postRouter