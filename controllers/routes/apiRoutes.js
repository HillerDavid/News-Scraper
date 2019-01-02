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

      db.Article.create(article).then(article => {
        console.log(`Added ${article}`)
      }).catch(err => {
        console.log(err)
      })
    })
    res.end('Scrape Complete')
  })
});

module.exports = router;
