# ISS Readable Stream Location
###### Find out where the ISS satellite is located at any time.

## Installation
1. Clone repo locally
2. `cd` into new directory
3. `npm install` to install dependencies

## Usage
1. Run `node demo.js` to run example file
2. If you wish you create your own, touch new file and import require location.js file
```javascript
var LocationStream = require('../lib/location');

var sampleStream = new LocationStream(25544, 2);

// sampleStream.setEncoding('utf8');


sampleStream.on('readable', function(){

  var chunk = sampleStream.read();
  if (chunk !== null){
    console.log(chunk);
  }
});

```
#### API Usage

I'm using api.wheretheiss.at to retrieve satellite information.

## Legal

This software is licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
