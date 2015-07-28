var http = require("http");

function logRequest(request, prefix) {
    prefix = prefix ? prefix : "request";
    log(prefix + ": " + JSON.stringify({
        "headers": request.headers,
        "httpVersion": request.httpVersion,
        "method": request.method,
        "url": request.url
    }));
};

function log(message) {
    console.log(new Date() + " " + message);
};

function logConnections() {
    server.getConnections(function(err, count) {
        log("connection count: " + count);
    });
}

server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
    logRequest(request, '');
}).listen(8080, "127.0.0.1");

server.on('connection', function (socket) {
    log("new connection from " + socket.remoteAddress);
    logConnections();
    socket.on("close", function() {
        log("connection closed");
        logConnections();
    });
});

