var LocationStream = require('../lib/location');
var DeltaStream = require('../lib/transform');
var sampleStreamDelta = new DeltaStream(25544, 2);
var sampleStreamLocation = new LocationStream(25544, 2);

sampleStreamLocation.setEncoding('utf8');

sampleStreamLocation.on('readable', function(){

  var chunk = sampleStreamLocation.read();
  if (chunk !== null){
    console.log(chunk);
  }
});
