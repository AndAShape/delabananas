/// <reference path="node_modules/typescript-require/typings/node.d.ts" />
//// hello 123
var http  = require('http');
var fs    = require('fs');
var path  = require('path');
var mime  = require('mime');
var cache = {};

var server = http.createServer(function(request, response) {
	var filePath = '';

	if (request.url == '/') {
		filePath = 'public/index.htm';
	} else {
		filePath = 'public' + request.url;
	}

	var absPath = './' + filePath;

	serveStatic(response, cache, absPath);
});

function serveStatic(response, cache, absPath) {

    	fs.exists(absPath, function(exists) {

    		if (exists) {

				fs.readFile(absPath, function(err, data) {

				  if (err) {
				    send404(response);
				  } else {
				    sendFile(response, absPath, data);
				  }

				});

			} else {
				send404(response);
	      	}
		});
}

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

server.listen(3000, function() {
          console.log("Server listening on port 3000.");
});