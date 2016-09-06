var stream = require('stream');
var util = require('util');
var https = require('https');
var events = require('events')
var config = require('./config');


/**
 * Configures API call for getting data
 * @param {string} id - satellite ID
 * @param {string} freq - the return rate of the stream
 */
function LocationStream(id, freq){
  stream.Readable.call(this);
  this.userParams = this.configuration(id, freq);

  this.httpOptions = {
    hostname: config.host,
    path: `https://api.wheretheiss.at/v1/satellites/${this.userParams.id}`
  };
  this.readable = true;
  this.stopped = false;
}

/**
 * Inherits prototype methods from one constructor to another
 */
util.inherits(LocationStream, stream.Readable);

LocationStream.prototype.configuration =  (id, freq) => {
  return {
    'id': id,
    'freq': 1000 * freq
    };
  };

/**
  * Keeps reading data until stream end
  */
LocationStream.prototype._read = function() {
  if (this.stopped === false) {
    var self = this;
    setTimeout(function() {
      self.makeHTTPSRequest();
      }, self.userParams.freq);
  } else {
      this.emit('end');
  }
};

/**
  *  Prototype for getting getting and returning stream information
  *  On result, it parses and formats the returned data
  *  On end, it pushes data into str. Will also console log errors
  */
LocationStream.prototype.makeHTTPSRequest = function(){
  var self = this;

  function queryISS(res) {
    var str = '';
    res.on('data', (chunk) => {
      formatChunk = JSON.stringify(JSON.parse(chunk),null,3);
      str += formatChunk;
    }).on('end', () => {
      self.push(str);
    }).on('error', (e) => {
      console.log(e.message);
    });
  }

  return https.get(this.httpOptions, queryISS);
};

module.exports = LocationStream;
