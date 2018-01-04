let chai = require("chai");
let expect = chai.expect;
let debug = require("debug")("nodeTest-dbg");

let index = require("../src/index");

describe('"index" module exports', function() {
  let module = index();
  let testNet = module.getTestNetworkIds();
  it('should have meta for seed node', function() {
    expect(testNet.seeds).to.be.instanceOf(Array);
    expect(testNet.seeds.length).to.be.eq(1)
  });
  it('should have meta for peer nodes.', function() {
    expect(testNet.nodes).to.be.instanceOf(Array);
    expect(testNet.nodes.length).to.be.eq(5)
  });
  it('should be able to return initiate kad seed nodes from Test Network identities.', function() {
    let seed = module.createNode(testNet.seeds[0]);
    expect(seed).to.be.instanceOf(Object);
  });
  it('should be able to return initiate kad peer nodes from Test Network identities.', function() {
    let node = module.createNode(testNet.nodes[0]);
    expect(node).to.be.instanceOf(Object);
  });
});
