const express = require('express')
const methodOverride = require('method-override')
require('./dbConnect')()
const Post = require('./Post')
const path = require('path')
const postRouter = require('./routers/postRouter')
const app = express()

// parses json to object
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'pages'))

app.use(postRouter)

app.listen(5000, () => console.log('listening on: http://localhost:5000'));




// GET http://localhost:5000/posts-query?id=1
// app.get('/posts-query', (req, res) => {
//     console.log(req.query.id)
//     res.status(200).json(posts)
// })
