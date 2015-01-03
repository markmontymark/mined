'use strict';

var async = require('async');
var extend = require('extend');

// per-interval fns
var who = require('./fn/who');
var df = require('./fn/df');
var uptime = require('./fn/uptime');
var totalRunTime = require('./fn/totalRunTime');
var intervalTime = require('./fn/intervalTime');
var airport = require('./fn/airport');

function results(err,res){
  var merged = {'datetime':Date.now()};
  res.forEach(function(result){
    merged = extend(merged,result);
  });
  console.log(JSON.stringify(merged));
}

function onInterval(){
  var startIntervalTime = Date.now();
  async.parallel( [
      totalRunTime(startTime),
      who,
      uptime,
      airport,
      df,
      intervalTime(startIntervalTime)
    ],
    results
  );
}

var interval = 15 * 60 * 1000;
var startTime = Date.now();
onInterval();
setInterval(onInterval, interval);

