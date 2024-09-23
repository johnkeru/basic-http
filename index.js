const express = require('express')
const app = express()

let posts = [
    {
        id: 1,
        title: 'post 1'
    },
    {
        id: 2,
        title: 'post 2'
    },
]
// parses json to object
app.use(express.json())

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})

// GET http://localhost:5000/posts-query?id=1
// app.get('/posts-query', (req, res) => {
//     console.log(req.query.id)
//     res.status(200).json(posts)
// })

app.post('/posts', (req, res) => {
    const body = req.body
    posts.push({ ...body, id: posts.length + 1 })
    res.send('New post added successfully')
})
// http://localhost:5000/posts/1312
app.put('/posts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const isIdExists = posts.find(post => post.id === id)
        if (!isIdExists) throw new Error(`No user found with id of ${id}`)
        const { title } = req.body
        posts.map(post => {
            if (post.id == id) {
                post.title = title
            }
            return post
        })
        res.send('New post added successfully')
    } catch (e) {
        res.status(500).send(e.message)
    }
})
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    posts = posts.filter(p => {
        return p.id !== parseInt(id)
    })
    res.send('post deleted successfully')
})


app.listen(5000, () => console.log('listening on: http://localhost:5000'));
