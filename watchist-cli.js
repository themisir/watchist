#! /usr/bin/env node

/********************************************************
 * watchist-cli.js
 * Watchist command line interface application.
 * @author Misir Jafarov <hello@misir.xyz>
 * @license MIT
 ********************************************************/

var chokidar = require('chokidar');
var http = require('http');
var connections = [];
var params = { debug: false, port: 2588 };

process.argv.forEach(function(arg) {
    if (['--debug', '-d'].indexOf(arg) >= 0) params.debug = true;
    if (arg.indexOf('--port=') == 0) params.port = parseInt(arg.substring(7).trim()) || params.port;
    if (arg.indexOf('-p=') == 0) params.port = parseInt(arg.substring(3).trim()) || params.port;
});

chokidar
    .watch(__dirname, { ignored: /^\./ })
    .on('all', (event, path) => {
        params.debug && console.log('[fs] ' + event + ' - ' + path);
        if (['add', 'change', 'remove'].indexOf(event) >= 0) {
            var limit = 0;
            while (connections.length > 0 && limit < 256) {
                var res = connections.pop();
                res.writeHead(200, {"Content-Type": "text/json", "Access-Control-Allow-Origin": "*"});
                res.write(JSON.stringify({ update: true }));
                res.end();
                limit++;
            }
            params.debug && limit>0 && console.log('[server] Refresh request sent to ' + limit + ' clients');
        }
    });

http
    .createServer((req, res) => connections.push(res))
    .listen(params.port, 'localhost', 0, () => params.debug && console.log('[server] Started on port number ' + params.port));