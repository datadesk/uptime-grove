/**
 * Grove plugin
 *
 * Notifies all events (up, down, paused, restarted) by sending a
 * HTTP POST request to the given URL. The request will have a
 * JSON payload of data from the event
 *
 * To enable the plugin, call init() from plugins/index.js
 *   exports.init = function() {
 *     require('uptime-grove').init();
 *   }
 *
 * Example configuration
 *   grove:
 *     event:
 *       up:
 *         - 'ieuPAr8UIQ24NAeqV1r9s0pHBHR7RTL9wq'
 *       down:
 *         - 'ieuPAr8UIQ24NAeqV1r9s0pHBHR7RTL9wq'
 *       paused:
 *       restarted:
 *     dashboardUrl: 'http://localhost:8082'
 */

var http       = require('https');
var url        = require('url');
var util       = require('util');
var config     = require('config');
var querystring = require('querystring');
var CheckEvent = require('../../models/checkEvent');

exports.init = function() {
  CheckEvent.on('afterInsert', function(checkEvent) {
    var grove = config.grove;
    var groveIDs = grove.event[checkEvent.message];

    if (!util.isArray(groveIDs)) return;
    checkEvent.findCheck(function(err, check) {
        if (err) return console.error(err);

        groveIDs.forEach(function(groveID) {
            var message = "[SIREN] " + check.name + " is " + checkEvent.message;
            if (checkEvent.details) {
                message += ": " + checkEvent.details;
            }
            var data = querystring.stringify({
              url: check.url,
              service: "Uptime",
              message: message,
              icon_url: 'https://raw.github.com/datadesk/uptime-grove/master/siren.gif'
            });
            
            var href = 'https://grove.io/api/notice/' + groveID + "/";
            options = url.parse(href);
            options.method = 'POST';
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            };
            
            var req = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {});
            });
            
            req.write(data);
            req.end();
        });

    });
  });
  console.log('Enabled grove plugin');
};
