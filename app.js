const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

var accumulator = [];

var scrape = (rootId, nameAcc = '') => {
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
        json['name'] = nameAcc.length === 0 ? words : nameAcc + ' > ' + words;
        json['size'] = Number(subtree_size);
        accumulator = accumulator.concat(json);
        // console.log('json after declaration: ', json, '\ntypeof json["size"]: ', typeof json['size']);
        if (data.children().length > 0) {
          console.log('current node(' + rootId + ') has ' + data.children().length + ' children...');
          data.children().each(function(i, element) {
            // console.log('this is child: ', i, '\nelement: ', element);
            const newRootId = $(this).attr().synsetid;
            console.log('newRootId: ', newRootId);
            scrape(newRootId, json['name']);
          })
        } else {
          console.log('accumulator: ', accumulator, '\naccumulator.length: ', accumulator.length);
        }
      })
    }
  })
}

app.get('/', function(req, res) {
  console.log('sending GET request...');
  scrape('82127');
  res.send('Drink Me...');
})

app.listen(3000, function() {
  console.log('operam-assessment is listening to port 3000!');
})