let chai = require("chai");
let expect = chai.expect;
let debug = require("debug")("indexTest-dbg");

let index = require("../src/index");

describe('"index" module exports', function() {
  it('should an instance of "Function".', function() {
    expect(index).to.be.instanceOf(Function);
  });
  let module = index();
  it('should return an instance of "Object".', function() {
    expect(module).to.be.instanceOf(Object);
  });
  let b1 = module.randomIdentity();
  let b2 = module.randomIdentity();
  it("should generate random buffer each time.", function() {
    expect(b1).to.be.instanceOf(Buffer);
    expect(b2).to.be.instanceOf(Buffer);
    expect(b1).to.be.not.equal(b2);
  });
  it("should conver buffer to hex string", function() {
    expect(typeof module.toHex(b2)).to.be.eq("string");
  });
  it("should return random port integer", function() {
    let ports = [];
    for (var i = 0, len = 1000; i < len; i++) {
      ports.push(module.getRandomPort());
    }
    expect(Math.min.apply(ports) > 1337).to.be.true;
    expect(Math.max.apply(ports) < 1337).to.be.true;
    expect(ports).to.be.instanceOf(Array);
  });
  it('should return an Object with test network metadata generated randomly each time.', function() {
    let net1 = module.generateTestIds();
    let net2 = module.generateTestIds();
    expect(net1).to.be.not.eql(net2);
  });
  let net1 = module.getTestNetworkIds();
  let net2;
  setTimeout(function function_name() {
    net2 = module.getTestNetworkIds();
    it('should return same test net data every time from storage, while generated randomly on first call.', function() {
      expect(net1).to.be.eql(net2);
    });
  },1000)
  it('should be able to return initiate kad seed nodes from Test Network identities.', function() {


  });
});
