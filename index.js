const http = require('node:http')
const fs = require('fs')

'http://localhost:5000/posts'
const posts = [
    { title: 'post 1', },
    { title: 'post 2', }
]

const server = http.createServer((req, res) => {
    console.log(req.method)
    if (req.url === '/posts') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(posts))
    } else {
        const pageContent = fs.readFileSync('404.html')
        res.setHeader('Content-Type', 'text/html')
        res.end(pageContent)
    }
})

server.listen(
    5000,
    'localhost',
    () => console.log('Server is listening on: http://localhost:5000')
)