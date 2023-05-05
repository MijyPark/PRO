const express = require('express')
const session = require('express-session')
const { isLoggedIn } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')
const uploader = require('../middleware/cloudinary.config.js');
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('member', isLoggedIn, (req, res, next) => {
  console.log(req.session)
  res.render('member', { user: req.session.user })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err)
    res.redirect('/')
  })
})

module.exports = router