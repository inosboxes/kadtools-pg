let filename = __filename.split('/');
filename = filename[filename.length-1].split('.');
filename = filename[0];
const index  = require('./index');
let indexMod = index();
let debug = require("debug")(filename + "-dbg");
debug("hello");
module.exports = function () {
  let testNet = indexMod.getTestNetworkIds();
  function createNodes(nodesMeta) {
    let nodes = [];
    for (var i = 0, len = nodesMeta.length; i < len; i++) {
      let node = indexMod.createNode(nodesMeta[i])
      nodes.push(node);
    }
    return nodes;
  }
  return {
    seed : indexMod.createNode(testNet.seeds[0]),
    nodes: createNodes(testNet.nodes)
  }
}

