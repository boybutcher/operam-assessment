const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/operam-scrape');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected to localhost!');
});

var treeNodeSchema = mongoose.Schema({
  name: String,
  size: Number,
});

var treeNode = mongoose.model('treeNode', treeNodeSchema);

var storeNode = (nodeText, nodeSize) => {
  treeNode.create({name: nodeText, size: nodeSize}, (err, result) => {
    if (err) {
      console.error(err);
    } 
  })
}

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
        storeNode(json.name, json.size);
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
              storeNode(jsonClone.name, jsonClone.size);
            }
          })
        } 
      })
      console.log('accumulator: \n', accumulator, '\naccumulator.length: ', accumulator.length);
    }
  })
}

app.get('/scrape', (req, res) => {
  console.log('sending GET request... init scrape()...');
  scrape('82127');
  res.send('scraping...');
});

app.get('/clear', (req, res) => {
  console.log('clearing database...');
  res.send('clearing database...');
})

app.get('/', (req, res) => {
  res.send('this is the base page');
});


app.listen(3000, () => {
  console.log('operam-assessment is listening to port 3000!');
})