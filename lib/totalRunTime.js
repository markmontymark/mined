'use strict';

module.exports = function(startTime){
  return function(done){
    done(null,{'totalRunTime': (Date.now() - startTime)});
  };
};

