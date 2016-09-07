var LocationStream = require('../lib/location');
var DeltaStream = require('../lib/transform');
var sampleStreamDelta = new DeltaStream(25544, 2);
var sampleStreamLocation = new LocationStream(25544, 2);

sampleStreamDelta.setEncoding('utf8');

sampleStreamDelta.on('readable', function(){

  var chunk = sampleStreamDelta.read();
  if (chunk !== null){
    console.log(chunk);
  }
});
