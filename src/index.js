#!/usr/bin/ env node

var http = require("http");
var util = require("util");

function log(message) {
    process.stdout.write(new Date() + " " + message + "\n");
}

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
            log(util.format("response: %j", {
                "headers": headers,
                "body": body
            }));
        });
    }, 1000);
})

function logConnections() {
    server.getConnections(function (err, count) {
        log(util.format("connection: %d open", count));
    });
}

server.on("connection", function (socket) {
    log(util.format("connection: open from %s", socket.remoteAddress));
    logConnections();
    socket.on("close", function () {
        log(util.format("connection: closed with %s", socket.remoteAddress));
        logConnections();
    });
});

require("yargs")
    .command("$0", "start the http server", (yargs) => {
        yargs
            .option("port", {
                alias: "p",
                describe: "port to bind on",
                default: 80
            })
            .option("ip", {
                alias: "i",
                describe: "ip to bind on",
                default: "0.0.0.0"
            })
    }, (argv) => {
        log(util.format("http server listening on %s:%d", argv.ip, argv.port));
        server.listen(argv.port, argv.ip);
    })
    .alias('h', 'help')
    .help('help')
    .argv