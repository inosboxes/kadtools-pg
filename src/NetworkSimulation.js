const Async = require("async");
let filename = __filename.split("/");
filename = filename[filename.length - 1].split(".");
filename = filename[0];
const index = require("./index");
let indexMod = index();
let debug = require("debug")(filename + "-dbg");
debug("hello");
module.exports = function() {
  let testNet = indexMod.getTestNetworkIds();
  function createNodes(nodesMeta) {
    let nodes = [];
    for (var i = 0, len = nodesMeta.length; i < len; i++) {
      let node = indexMod.createNode(nodesMeta[i]);
      nodes.push(node);
    }
    return nodes;
  }
  return {
    seed: indexMod.createNode(testNet.seeds[0]),
    nodes: createNodes(testNet.nodes),
    joinNodes: function(next) {
      let self = this;
      let seedMeta = testNet.seeds[0];
      seedMeta = [seedMeta[0], {hostname: seedMeta[1], port: seedMeta[2]}]
      Async.mapSeries(
        self.nodes,
        function(instance, callback) {
          //callback(null, instance)
          debug(seedMeta)
          instance.join(seedMeta, function() {
              if (instance.router.size) {
                debug(`Connected to ${instance.router.size} peers!`);
                callback(null, instance.router.size);
              } else {
                debug("No seed or peers found.");
                callback(null, new Error("Not able to connect to any peer"));
              }
            });
        },
        next
      );
    },
    stopNodes: function(next) {
      Async.mapSeries(
        this.nodes,
        function(instance, callback) {
          instance.transport.server
            .close() // Won't accept new connection
            .on("close", () => {
              debug(" Server stopped");
              callback(null);
            })
            .on("error", e => {
              debug(" Error stopping server:", e);
              callback(null,e);
            });
        },
        next
      );
    }
  };
};
