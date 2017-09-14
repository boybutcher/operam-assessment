const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require('./database.js');

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
        db.storeNode(json.name, json.size);
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
              db.storeNode(jsonClone.name, jsonClone.size);
            }
          })
        } 
      })
      console.log('accumulator.length: ', accumulator.length);
    }
  })
}

app.get('/scrape', (req, res) => {
  scrape('82127');
});

app.get('/clear', (req, res) => {
  db.clearCollection((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.get('/fetch', (req, res) => {
  db.fetchCollection((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.listen(3001, () => {
  console.log('operam-assessment is listening to port 3001!');
})