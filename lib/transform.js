var stream = require('stream')
 ,  util = require('util')
 ,  https = require('https')
 ,  LocationStream = require('../lib/location');

/**
 * Represents new stream.
 * @param {number} id - id of satellite.
 * @param {number} frequency in which returned.
 */
exports.create = function(id, freq){
	return new DeltaStream(id, freq);
};

/**
 * Inherits prototype methods from one constructor to another
 */
util.inherits(DeltaStream, stream.Readable);
/**
 * constructs new stream.
 * @param {number} id - id of satellite.
 * @param {number} frequency in which returned.
 */
function DeltaStream(id, rate){
	stream.Readable.call(this);

	// create new location stream
	this._locStream = new LocationStream(id, rate);

	var self = this;

  /**
   * Configures to read data from stream
   */
	this._locStream.on('readable', readStream);

	function readStream(){
		var chunk = self._locStream.read();

		if( chunk ){
			var data = JSON.parse(chunk);
			var lat = data.latitude;
			var long = data.longitude;

			if( self.lastLat == null || self.lastLong == null ){
      /**
       * First time getting data will grab last lat and long
       * since there is no lat/long difference of first read
       */
				self.lastLat = lat;
				self.lastLong = long;
				return '';
			}
			var output = {};
      /**
      * Math for getting difference between each lat/long data
      */
			output.latDiff = self.lastLat - lat;
			output.longDiff = self.lastLong - long;
			self.lastLat = lat;
			self.lastLong = long;

			return self.push( JSON.stringify(output) );

		}
	}
}

DeltaStream.prototype._read = function(){
	return this.push('');
};

module.exports = DeltaStream;
