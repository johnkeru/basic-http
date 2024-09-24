const http = require('node:http')
const fs = require('fs')

'http://localhost:5000/posts'

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

const server = http.createServer((req, res) => {
    const method = req.method
    if (req.url === '/posts') {
        if (method === "GET") {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(posts))
        } else if (method === 'POST') {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const newPost = Object.assign(JSON.parse(body), { id: posts.length + 1 })
                posts.push(newPost)
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(posts))
            })
        }
        else if (method === 'PUT') {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const { id, title } = JSON.parse(body)
                const post = JSON.parse(body)

                posts = posts.map(p => {
                    if (p.id == post.id) {
                        return { ...p, ...post }
                    }
                    return p
                })
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(posts))
            })
        }
        else {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const { id } = JSON.parse(body)
                posts = posts.filter(p => p.id !== id)
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(posts))
            })
        }
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