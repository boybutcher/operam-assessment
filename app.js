const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

var rootId = '82127';
var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid=' + rootId;

var scrape = () => {
  var accumulator = [];
  request(url, function(error, response, body) {
    // console.log('error: \n', error);
    // console.log('response: \n', response);
    // console.log('body: \n', body);
    if (!error) {
      console.log('no error... \nloading body to cheerio...');
      const $ = cheerio.load(body);
      const selector = 'synset[synsetid="' + rootId + '"]';
      // console.log('selector: ', selector);
      const json = {name: '', size: 0};
      $(selector).filter(function() {
        var data = $(this);
        console.log('"data" after filtering var "selector": \n', data);
        // console.log('data.attr(): \n', data.attr());
        // console.log('data.attr().words: ', data.attr().words);
        // console.log('data.attr().subtree_size: ', data.attr().subtree_size);
        // console.log('data.attr().synsetid: ', data.attr().synsetid);
        // console.log('data.children().length: ', data.children().length, '\ntypeof data.children().length: ', typeof data.children().length);
        // console.log('data.children().first().children(): \n', data.children().first().children());
        var {
          words,
          subtree_size,
          synsetid,
        } = data.attr();
        json['name'] = words;
        json['size'] = Number(subtree_size);
        accumulator = accumulator.concat(json);
        // console.log('json after declaration: ', json, '\ntypeof json["size"]: ', typeof json['size']);
        console.log('accumulator: ', accumulator);
      })
    }
  })
}

app.get('/', function(req, res) {
  console.log('sending GET request to "http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid=82127"...');
  scrape();
  res.send('Drink Me...');
})

app.listen(3000, function() {
  console.log('operam-assessment is listening to port 3000!');
})