var LocationStream = require('../lib/location');

var sampleStream = new LocationStream(25544, 2);

sampleStream.setEncoding('utf8');


sampleStream.on('readable', function(){

  var chunk = sampleStream.read();
  if (chunk !== null){
    console.log(chunk);
  }
});
