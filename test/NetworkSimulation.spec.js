let chai = require('chai');
let expect = chai.expect;

let NetworkSimulation = require('../src/NetworkSimulation')
let debug = require("debug")('NetSimTest' + "-dbg");

describe('"NetworkSimulation" module exports', function(){
  let simulation = NetworkSimulation();
  it('should an instance of "Function".', function() {
    expect(NetworkSimulation).to.be.instanceOf(Function)
  })
  it('should return an instance of "Object".', function() {
    expect(simulation).to.be.instanceOf(Object)
    expect(simulation.nodes).to.be.instanceOf(Array)
    expect(simulation.seed).to.be.instanceOf(Object)
    expect(simulation.joinNodes).to.be.instanceOf(Function)
    expect(simulation.stopNodes).to.be.instanceOf(Function)
  })
  it('should be able to join all nodes in test net.', function(done) {
    simulation.joinNodes(function (err, result) {
      debug(result)
      done();
    })
  });
})
