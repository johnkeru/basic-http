// module.exports
const Post = require('../models/Post')

exports.getPosts = async (req, res) => {
    const posts = await Post.find()
    // res.status(200).json(posts)
    res.render('posts', { posts })
}

exports.renderPostForm = (req, res) => res.render('create-post')

exports.createPost = async (req, res) => {
    try {
        const body = req.body
        const newPost = new Post(body)
        await newPost.save();
        res.redirect('/posts')
    } catch {
        res.status(500).send('Server Error')
    }
}

exports.renderUpdateForm = async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('update-post', { post })
}

exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        console.log(id, body)
        await Post.findByIdAndUpdate(id, body)
        res.redirect('/posts')
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.deletePost = async (req, res) => {
    const id = req.params.id
    await Post.findByIdAndDelete(id)
    res.redirect('/posts')
}