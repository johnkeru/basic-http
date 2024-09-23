const express = require('express')
require('./dbConnect')()
const Post = require('./Post')
const app = express()

// parses json to object
app.use(express.json())

app.get('/posts', async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

app.post('/posts', async (req, res) => {
    try {
        const body = req.body
        const newPost = new Post(body)
        await newPost.save();
        res.send('New post added successfully')
    } catch {
        res.status(500).send('Server Error')
    }
})
// http://localhost:5000/posts/1312
app.put('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const body = req.body
        await Post.findByIdAndUpdate(id, body)
        res.send('New post added successfully')
    } catch (e) {
        res.status(500).send(e.message)
    }
})
app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id
    await Post.findByIdAndUpdate(id)
    res.send('post deleted successfully')
})

app.listen(5000, () => console.log('listening on: http://localhost:5000'));




// GET http://localhost:5000/posts-query?id=1
// app.get('/posts-query', (req, res) => {
//     console.log(req.query.id)
//     res.status(200).json(posts)
// })
