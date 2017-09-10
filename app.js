const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

var rootId = '82127';
var accumulator = [];

var scrape = () => {
  console.log('calling on rootId: ', rootId);
  var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML?rootid=' + rootId;
  console.log('url: ', url);
  request(url, function(error, response, body) {
    // console.log('error: \n', error);
    // console.log('response: \n', response);
    // console.log('body: \n', body);
    if (!error) {
      console.log('no error... \nloading body to cheerio...');
      const $ = cheerio.load(body);
      const selector = 'synset[synsetid="' + rootId + '"]';
      console.log('selector: ', selector);
      const json = {name: '', size: 0};
      $(selector).filter(function() {
        var data = $(this);
        // console.log('"data" after filtering var "selector": \n', data);
        // console.log('data.siblings(): ', data.siblings());
        // console.log('data.attr(): \n', data.attr());
        console.log('data.attr().words: ', data.attr().words);
        console.log('data.attr().subtree_size: ', data.attr().subtree_size);
        console.log('data.attr().synsetid: ', data.attr().synsetid);
        console.log('data.children().length: ', data.children().length, '\ntypeof data.children().length: ', typeof data.children().length);
        // console.log('data.children().last(): \n', data.children().last());
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
        if (data.children().length > 0) {
          console.log('current node(' + rootId + ') has ' + data.children().length + ' children...');
          rootId = data.children().first().attr().synsetid;
          scrape();
        } else if (data.children().length === 0) {
          console.log('current node(' + rootId + ') has no children... next()...')
          rootId = data.next().attr().synsetid;
          console.log('rootId: ', rootId);
          scrape()
        }
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