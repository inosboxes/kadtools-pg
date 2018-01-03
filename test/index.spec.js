let chai = require('chai');
let expect = chai.expect;

let index = require('../src/index')

describe('"index" module exports', function(){
  it('should an instance of "Object".', function() {
    expect(index).to.be.instanceOf(Function)
  })
})
