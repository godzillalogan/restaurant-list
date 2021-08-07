module.exports = {
  authenticator: (req, res, next) => {
    // console.log("我是req.isAuthenticated()",req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg','請先登入才能使用')
    res.redirect('/users/login')
  }
}