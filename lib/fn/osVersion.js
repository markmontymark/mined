'use strict';

var fs = require('fs');
var plist = require('plist');

module.exports = function (done){
  done(null,{
    'osVersion': plist.parse(fs.readFileSync(
      '/System/Library/CoreServices/SystemVersion.plist',
      'utf8'))
  });
};
