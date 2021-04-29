const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // rendering: display template engine files
  res.render('home', {
  })
})