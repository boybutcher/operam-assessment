const express = require('express');
const app = express();
const request = require('request');

app.get('/', function(req, res) {
  console.log('sending GET request to "http://imagenet.stanford.edu/synset?wnid=n02486410"...');
  const url = 'http://imagenet.stanford.edu/synset?wnid=n02486410';
  request(url, function(error, response, body) {
    // console.log('error: ', error);
    // console.log('response: ', response);
    console.log('body: ', body);
  })

  res.send('filler response');
})

app.listen(3000, function() {
  console.log('operam-assessment is listening to port 3000!');
})