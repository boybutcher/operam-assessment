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
  var result;
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
        for (var j = 0; j < splitName.length; j++) {
          var template = {name: '', size: undefined, children: []};
        }
      }
    }
  })
  console.log('result: ', result);
}

//TEST DATA FOR treeConstruct()
var testSet = [
  {
    name: 'ImageNet > Natural > Radiator > Radio Source',
    size: 200,
  },
  // {
  //   name: 'ImageNet > Plant Flora',
  //   size: 100,
  // },
  // {
  //   name: 'ImageNet > Natural > Rock, Stone',
  //   size: 73,
  // },
  // {
  //   name: 'ImageNet > Geological',
  //   size: 762,
  // },
  // {
  //   name: 'ImageNet > Natural > Asterism',
  //   size: 123,
  // },
  // {
  //   name: 'ImageNet > Natural > Consolidation',
  //   size: 8323,
  // },
];

var treeConstruct = (arr) => {
  var tree;
  for (var i = 0; i < arr.length; i++) {
    var currentBranch = arr[i];
    var nameSplit = currentBranch.name.split(' > ');
    var currentObjs = createNodes(nameSplit);
    currentObjs[currentObjs.length - 1].size = arr[i].size;
    tree = checkAddChildren(currentObjs, tree);
  }
  console.log('tree: ', tree);
  return tree;
};

var checkAddChildren = (arr, tree) => {
  if (tree === undefined) {
    tree = arr[0];
  }
  var reference = tree;
  for (var i = 1; i < arr.length; i++) {
    var children = reference.children;
    for (var j = children.length - 1; j >= -1; j--) {
      if (children.length === 0 || j < 0) {
        var newChildNode = Object.assign({}, arr[i]);
        children.push(newChildNode);
        reference = newChildNode;
      } else if (children[j].name === arr[i].name) {
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
    var template = {name: arr[i], size: undefined, children: []};
    result.push(template);
  }
  return result;
};

var newThing = treeConstruct(testSet);


module.exports.treeNode = treeNode;
module.exports.storeNode = storeNode;
module.exports.clearCollection = clearCollection;
module.exports.fetchCollection = fetchCollection;