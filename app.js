const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

var accumulator = [];

var scrape = (rootId, nameAcc = '') => {
  var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid=' + rootId;
  request(url, function(error, response, body) {
    console.log('scraping at ' + url);
    if (!error) {
      const $ = cheerio.load(body);
      const selector = 'synset[synsetid="' + rootId + '"]';
      const json = {name: '', size: 0};
      $(selector).filter(function() {
        var data = $(this);
        var {
          words,
          subtree_size,
          synsetid,
        } = data.attr();
        json['name'] = nameAcc.length === 0 ? words : nameAcc + ' > ' + words;
        json['size'] = Number(subtree_size);
        accumulator.push(json);
        if (data.children().length > 0) {
          data.children().each(function(i, element) {
            var {
              words,
              subtree_size,
              synsetid,
              num_children
            } = $(this).attr()
            if (Number(num_children) !== 0) {
              const newRootId = synsetid;
              scrape(newRootId, json['name']);
            } else {
              const jsonClone = {name: json['name'] + ' > ' + words, size: Number(subtree_size)};
              accumulator.push(jsonClone);
            }
          })
        } 
      })
      console.log('accumulator: ', accumulator);
    }
  })
}

app.get('/scrape', function(req, res) {
  console.log('sending GET request... init scrape()...');
  scrape('82127');
  res.send(accumulator);
})

app.get('/', function(req, res) {
  res.send('this is the base page')
})

app.listen(3000, function() {
  console.log('operam-assessment is listening to port 3000!');
})