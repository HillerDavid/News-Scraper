var db = require('../../models')
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  db.Article.find({}).sort({dateCreated: -1}).populate('notes').then(articleData => {
    res.render('index', { article: articleData })
  })
})

/* GET saved review page. */
router.get('/saved', function (req, res) {
  res.render('index', { title: 'Game Reviews Scraper' })
})

module.exports = router