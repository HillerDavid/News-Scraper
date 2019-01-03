var db = require('../../models')
var axios = require('axios')
var cheerio = require('cheerio')
var express = require('express');
var router = express.Router();

/* GET review listing. */
router.get('/api/scrape', function (req, res) {
  console.log('Scraping...')
  axios.get('https://www.gameinformer.com/reviews').then(response => {
    var $ = cheerio.load(response.data)

    $('div.teaser').each(function (i, element) {
      var article = {}
      article.headline = $(this).children('.teaser-right').find('a').text()
      article.URL = 'https://www.gameinformer.com' + $(this).children('.teaser-left').find('a').attr('href')
      article.summary = $(this).find('.promo-summary').text()
      article.score = $(this).find('.score').text()
      article.thumbnail = $(this).children('.teaser-left').find('img').attr('src')

      db.Article.create(article).then(article => {
        console.log(`Added ${article}`)
      }).catch(err => {
        console.log(err)
      })
    })
    res.end('Scrape Complete')
  })
});

router.post('/api/note/:id', (req, res) => {
  db.Note.create({ message: req.body.message }).then((newNote) => {
    res.json(newNote);
    return db.Article.findByIdAndUpdate({ _id: req.params.id }, { $push: { notes: newNote } })
  }).then(dbArticle => {
    console.log(dbArticle)
    res.json(dbArticle);
  }).catch(err => {
    res.end('Database Error')
  })
});


router.post('/api/remove/:id', (req, res) => {
  db.Note.findByIdAndDelete({ _id: req.params.id })
    .then(data => {
      res.end()
    })
})

router.post('/api/save/:id', (req, res) => {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: true } })
    .then(data => {
      res.end()
    })
})

router.post('/api/unsave/:id', (req, res) => {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: false } })
    .then(data => {
      res.end()
    })
})

module.exports = router;
