var LocationStream = require('../lib/location');
var config = require('../lib/config');

describe('LocationStream', function() {
  var sampleStream = new LocationStream(25544, 2);

  it('should be a subclass from stream.Readable', function() {
    assert.equal(testStream1 instanceof stream.Readable, true);
  });

  it('show error if no parameters are given', function () {
    assert.throws(function () {
      let newStream = new LocationStream();
    }, Error);
  });

  it('should give error if ID of stream is not a number', function() {
    assert.throws(function () {
      let newStream = new LocationStream("Number", 2);
    }, Error);
  });

  it('should give error if frequency of stream is not a number', function() {
    assert.throws(function () {
      let newStream = new LocationStream(25544, "Number");
    }, Error);
  });


}
