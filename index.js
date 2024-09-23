const express = require('express')
const methodOverride = require('method-override')
require('./dbConnect')()
const Post = require('./Post')
const path = require('path')
const app = express()

// parses json to object
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'pages'))

app.get('/posts', async (req, res) => {
    const posts = await Post.find()
    // res.status(200).json(posts)
    res.render('posts', { posts })
})

app.get('/post-form', (req, res) => res.render('create-post'))
app.post('/post', async (req, res) => {
    try {
        const body = req.body
        const newPost = new Post(body)
        await newPost.save();
        res.redirect('/posts')
    } catch {
        res.status(500).send('Server Error')
    }
})
// http://localhost:5000/posts/1312
app.get('/post-form-update/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('update-post', { post })
})
app.put('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        await Post.findByIdAndUpdate(id, body)
        res.redirect('/posts')
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id
    await Post.findByIdAndDelete(id)
    res.redirect('/posts')
})

app.listen(5000, () => console.log('listening on: http://localhost:5000'));




// GET http://localhost:5000/posts-query?id=1
// app.get('/posts-query', (req, res) => {
//     console.log(req.query.id)
//     res.status(200).json(posts)
// })
