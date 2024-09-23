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
app.use(express.json())
app.use((req, res, next) => {
    console.log('authenticating...')
    req.user = { id: 1, name: 'user1' }
    next()
})

app.get('/posts', (req, res) => {
    console.log(req.user)
    res.status(200).json(posts)
})
app.post('/posts', (req, res) => {
    const body = req.body
    console.log(body)
    res.send('posts')
})


app.listen(5000, () => console.log('listening on: http://localhost:5000'));
