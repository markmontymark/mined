'use strict';

module.exports = function intervalTime(startIntervalTime){
  return function(done){
    var endTime = Date.now();
    var runTime = endTime - startIntervalTime;
    done(null,{'intervalTime': runTime});
  };
};

