const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require('./database.js');

const app = express();

var accumulator = []; 

var scrape = (rootId = '82127', nameAcc = '') => {
  var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid=' + rootId;
  request(url, function(error, response, body) {
    if (!error) {
      // make returned HTML parseable via Cheerio
      const $ = cheerio.load(body);
      const selector = 'synset[synsetid="' + rootId + '"]';
      const json = {name: '', size: 0};
      // looks for current nodes attributes
      $(selector).filter(function() {
        var data = $(this);
        var {
          words,
          subtree_size,
          synsetid,
        } = data.attr();
        // constructs object for storage
        json['name'] = nameAcc.length === 0 ? words : nameAcc + ' > ' + words;
        json['size'] = Number(subtree_size) - 1;
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
            // if the child node has children, run scrape recursively
            if (Number(num_children) !== 0) {
              const newRootId = synsetid;
              scrape(newRootId, json['name']);
            } else {
              //if a child node doesnt have children, create the objext and stor ein the database
              const jsonClone = {name: json['name'] + ' > ' + words, size: Number(subtree_size) - 1};
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
  scrape();
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