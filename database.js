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
  var result;
  treeNode.find({}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('fetched!');
      console.log(treeConstruct(result));  
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

var checkAddChildren = (arr, tree) => {
  if (tree === undefined) {
    tree = arr[0];
  }
  var reference = tree;
  if (arr.length === 1) {
    reference.size = arr[0].size;
  }
  for (var i = 1; i < arr.length; i++) {
    var children = reference.children;
    for (var j = children.length - 1; j >= -1; j--) {
      if (children.length === 0 || j < 0) {
        var newChildNode = Object.assign({}, arr[i]);
        children.push(newChildNode);
        reference = newChildNode;
      } else if (children[j].name === arr[i].name) {
        children[j].size += arr[i].size;
        reference = children[j];
        break;
      }
    }
  }
  return tree;
};

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