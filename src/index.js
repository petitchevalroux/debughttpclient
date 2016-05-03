var http = require("http");
var argv = require("minimist")(process.argv.slice(2));
var util = require("util");
var port = argv["p"] ? parseInt(argv["p"]) : 80;
var hostname = argv["h"] ? argv["h"] : "0.0.0.0";

function log(message) {
    process.stdout.write(new Date() + " " + message + "\n");
}

log(util.format("http server listening on %s:%d", hostname, port));
var server = http.createServer(function (request, response) {
    log(util.format("request: %j", {
        "headers": request.headers,
        "httpVersion": request.httpVersion,
        "method": request.method,
        "url": request.url,
        "remoteAddress": request.socket.remoteAddress
    }));
    setTimeout(function () {
        var body = "Hello World!";
        var headers = {
            "Content-Length": body.length,
            "Content-Type": "text/plain"
        };
        response.writeHead(200, headers);
        response.end(body, "utf8", function () {
            log(util.format("response: %j", {"headers": headers, "body": body}));
        });
    }, 1000);
}).listen(port, hostname);

function logConnections() {
    server.getConnections(function(err, count) {
        log(util.format("connection: %d open", count));
    });
}

server.on("connection", function(socket) {
    log(util.format("connection: open from %s", socket.remoteAddress));
    logConnections();
    socket.on("close", function() {
        log(util.format("connection: closed with %s", socket.remoteAddress));
        logConnections();
    });
});