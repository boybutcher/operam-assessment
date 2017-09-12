const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/operam-assessment');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected to localhost!');
});

var treeNodeSchema = mongoose.Schema({
  name: {type: String, unique: true},
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

var clearCollection = () => {
  treeNode.remove({}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('database cleared!');
    }
  })
}

var fetchCollection = () => {
  treeNode.find({}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('fetched!');
      for (var i = 0; i < result.length; i++) {
        var currentNode = result[i];
        var splitName = currentNode.name.split(' > ');
        // console.log('currentNode: ', currentNode);
        console.log('splitName: ', splitName);
      }
    }
  })
}

module.exports.treeNode = treeNode;
module.exports.storeNode = storeNode;
module.exports.clearCollection = clearCollection;
module.exports.fetchCollection = fetchCollection;