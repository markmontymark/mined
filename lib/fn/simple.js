'use strict';

var child_process = require('child_process');

module.exports = function (name,cmd,args){
  if(!name){
    console.error(__dirname +'/simple.js', 'a name is required as a first argument to simple()');
    return;
  }
  if(!cmd){
    cmd = name;
  }
  return function(done){
    var output = [];
    var errOutput = [];
    var p = child_process.spawn(cmd,args?args:[]);
    p.stdout.on('data',function (data){
      output.push(data.toString('utf-8'));
    });
    p.stderr.on('data',function (data){
      errOutput.push(data.toString('utf-8'));
    });
    p.on('close',function(/*code*/){
      var err = {};
      var result = {};
      var sendError = errOutput.length > 0;
      if(sendError){
        err[name + '-error'] = errOutput.join('');
      }
      result[name] = output.join('');
      done( sendError ? err : null, result);
    });
  };
};

