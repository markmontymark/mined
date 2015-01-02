'use strict';

var child_process = require('child_process');

module.exports = function (){
  return function(done){
    //console.log('in uptime as callback');
    var uptime = child_process.spawn('uptime');
    uptime.stdout.on('data',function (data){
      //console.log('in uptime stdout data callback',data.toString('utf-8'));
      done(null,{'uptime':data.toString('utf-8')});
    });
  };
};
