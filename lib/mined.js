'use strict';

var async = require('async');
var extend = require('extend');

// per-interval fns
var who = require('./fn/who');
var osVersion = require('./fn/osVersion');
var df = require('./fn/df');
var uptime = require('./fn/uptime');
var wwwNpmScrapeHtml = require('./fn/wwwNpmScrapeHtml');
var totalRunTime = require('./fn/totalRunTime');
var intervalTime = require('./fn/intervalTime');
var airport = require('./fn/airport');

var priorRun = {};
function results(err,res){
  var merged = {};
  var doSave = false;
  res.forEach(function(result){
    Object.keys(result).forEach(function(resultKey){
      if((!doSave) && priorRun[resultKey] !== result[resultKey]){
        doSave = true;
      }
    });
    merged = extend(merged,result);
  });
  if(!doSave){
    return;
  }
  merged.datetime = Date.now();
  console.log(JSON.stringify(merged));
}

function onInterval(){
  var startIntervalTime = Date.now();
  async.parallel( [
      totalRunTime(startTime),
      osVersion,
      who,
      uptime,
      airport,
      df,
      wwwNpmScrapeHtml,
      intervalTime(startIntervalTime)
    ],
    results
  );
}

var interval = 1 * 60 * 60 * 1000;
var startTime = Date.now();
onInterval();
setInterval(onInterval, interval);

