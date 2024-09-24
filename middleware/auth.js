module.exports = (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login')
    req.userId = req.session.userId
    next()
}