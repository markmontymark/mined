'use strict';

var scrape = require('scrape-html');

module.exports = function (done){
  var selector = 'div.sidebar ul.box:nth-of-type(2)';
  scrape('https://npmjs.com/package/scrape-html',selector,function(err,window){
    var stats = [];
    window.$(selector).each(function(i,ele){
      stats.push(ele.innerHTML.trim());
    });
    done(null,{
      'scrape-html-stats':stats
    });
  });
};

