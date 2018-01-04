let chai = require('chai');
let expect = chai.expect;

let NetworkSimulation = require('../src/NetworkSimulation')

describe('"NetworkSimulation" module exports', function(){
  let simulation = NetworkSimulation();
  it('should an instance of "Function".', function() {
    expect(NetworkSimulation).to.be.instanceOf(Function)
  })
  it('should return an instance of "Object".', function() {
    expect(simulation).to.be.instanceOf(Object)
  })
})
