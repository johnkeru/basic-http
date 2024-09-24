const User = require('../models/User')

exports.renderLogin = (req, res) => {
    res.render('auth/login', { field: '', message: '' })
}

exports.renderRegister = (req, res) => {
    res.render('auth/register', { field: '', message: '' })
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.render('auth/login', { field: 'username', message: 'User not found' })
        if (!user.comparePassword(password)) return res.render('auth/login', { field: 'password', message: 'Incorrect Password' })
        req.session.userId = user._id
        res.redirect('/posts')
    } catch (e) {
        res.render('auth/login', { field: 'username', message: 'Server Error' })
    }
}

exports.register = async (req, res) => {
    try {
        const { username, password, confirm_password } = req.body
        if (password !== confirm_password) return res.render('auth/register', { field: 'confirm_password', message: 'Password not match' })
        const newUser = await User({ username, password })
        await newUser.save()
        req.session.userId = newUser._id
        res.redirect('/posts')
    } catch (e) {
        console.log(e)
        res.render('auth/register', { field: 'username', message: 'Server Error' })
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
    })
}