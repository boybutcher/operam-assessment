const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/operam-assessment');

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

var clearCollection = (callback) => {
  treeNode.remove({}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

var fetchCollection = (callback) => {
  treeNode.find({}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      // if no data is stored in the database, return an empty array
      var assembledTree = treeConstruct(result) || [];
      callback(null, assembledTree);
    }
  })
}

var treeConstruct = (arr) => {
  var tree;
  for (var i = 0; i < arr.length; i++) {
    var currentBranch = arr[i];
    var nameSplit = currentBranch.name.split(' > ');
    var currentObjs = createNodes(nameSplit);
    currentObjs[currentObjs.length - 1].size = arr[i].size;
    tree = checkAddChildren(currentObjs, tree);
  }
  return tree;
};

//places nodes in tree
var checkAddChildren = (arr, tree) => {
  if (tree === undefined) {
    tree = arr[0];
  }
  // tracks which node it's on
  var reference = tree;
  // if the node name is just 'ImageNet 2011...', set that as the size at the top node
  if (arr.length === 1) {
    reference.size = arr[0].size;
  }
  //parse through the array
  for (var i = 1; i < arr.length; i++) {
    var children = reference.children;
    //traverse the tree at the current node
    for (var j = children.length - 1; j >= -1; j--) {
      //if the node isnt found, insert it
      if (children.length === 0 || j < 0) {
        var newChildNode = Object.assign({}, arr[i]);
        children.push(newChildNode);
        reference = newChildNode;
      } else if (children[j].name === arr[i].name) {
        // if the node is found, adjust the size accordingly
        children[j].size += arr[i].size;
        reference = children[j];
        break;
      }
    }
  }
  return tree;
};

//structures each node
var createNodes = (arr) => {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var template = {name: arr[i], size: null, children: []};
    result.push(template);
  }
  return result;
};

module.exports.treeNode = treeNode;
module.exports.storeNode = storeNode;
module.exports.clearCollection = clearCollection;
module.exports.fetchCollection = fetchCollection;