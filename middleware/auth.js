module.exports = {
  authenticator: (req, res, next) => {
    // console.log("我是req.isAuthenticated()",req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}