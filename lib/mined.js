'use strict';

var async = require('async');
var extend = require('extend');

// per-interval fns
var who = require('./who');
var uptime = require('./uptime');
var totalRunTime = require('./totalRunTime');
var intervalTime = require('./intervalTime');
//var wifi = require('./wifi');


function results(err,res){
  var merged = {'datetime':Date.now()};
  res.forEach(function(result){
    merged = extend(merged,result);
  });
  console.log(JSON.stringify(merged));
}

function onInterval(){
  var startIntervalTime = Date.now();
  async.series( [
      totalRunTime(startTime),
      who(),
      uptime(),
      intervalTime(startIntervalTime)
    ],
    results
  );
}

var startTime = Date.now();
onInterval();
setInterval(onInterval, 60 * 1000);

