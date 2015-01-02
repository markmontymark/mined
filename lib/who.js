'use strict';

var child_process = require('child_process');

module.exports = function (){
  return function(done){
    //console.log('in uptime as callback');
    var p = child_process.spawn('who');
    p.stdout.on('data',function (data){
      done(null,{'who':data.toString('utf-8')});
    });
  };
};

