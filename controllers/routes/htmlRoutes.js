var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Game Reviews Scraper' });
});

/* GET saved review page. */
router.get('/saved', function (req, res) {
  res.render('index', { title: 'Game Reviews Scraper' });
});
module.exports = router;
