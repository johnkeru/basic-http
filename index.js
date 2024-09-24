const express = require('express')
const methodOverride = require('method-override')
require('./configs/dbConnect')()
const path = require('path')
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')
const session = require('express-session')
const { create } = require('connect-mongo')

const app = express()

// parses json to object
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    store: create({
        mongoUrl: 'mongodb://127.0.0.1:27017/crud',
        collection: 'sessions',
        ttl: 60 * 60 * 24 * 7 // time to live
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}))
app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'pages'))

app.use(postRouter)
app.use(userRouter)

app.listen(5000, () => console.log('listening on: http://localhost:5000'));




// GET http://localhost:5000/posts-query?id=1
// app.get('/posts-query', (req, res) => {
//     console.log(req.query.id)
//     res.status(200).json(posts)
// })
