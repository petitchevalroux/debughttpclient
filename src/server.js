"use strict";

const http = require("http"),
    util = require("util");

class Server {

    constructor(options) {
        this.options = options || {};
        const self = this;
        this.server = http.createServer((request, response) => {
            setTimeout(() => {
                self.handleRequest(request, response);
            }, self.options.responseTimeout);
        })
        this.server.on("connection", (socket) => {
            self.onConnection(socket);
        });
    }

    log(message) {
        process.stdout.write(new Date() + " " + message + "\n");
    }

    logConnections() {
        const self = this;
        this.server.getConnections((err, count) => {
            self.log(util.format("connection: %d open", count));
        });
    }

    listen() {
        this.log(util.format("http server listening on %s:%d", this.options.ip, this.options.port));
        this.server.listen(this.options.port, this.options.ip);
    }

    handleRequest(request, response) {
        this.log(util.format("request: %j", {
            "headers": request.headers,
            "httpVersion": request.httpVersion,
            "method": request.method,
            "url": request.url,
            "remoteAddress": request.socket.remoteAddress
        }));
        const body = this.getBody();
        const headers = this.getHeaders(body);
        const self = this;
        response.writeHead(200, headers);
        response.end(body, "utf8", function () {
            self.log(util.format("response: %j", {
                "headers": headers,
                "body": body
            }));
        });
    }

    getHeaders(body) {
        const headers = {
                "Content-Length": body.length,
                "Content-Type": "text/plain"
            },
            cacheControl = this.getCacheControl();
        if (cacheControl) {
            headers['Cache-Control'] = cacheControl;
        }

        return headers;
    }

    getCacheControl() {
        let parts = [];
        if (this.options.cacheMaxAge) {
            parts.push(`max-age=${this.options.cacheMaxAge}`);
        }
        if (!parts.length) {
            return "";
        }
        return parts.join(', ');
    }

    getBody() {
        return "Hello World!";
    }

    onConnection(socket) {
        this.log(util.format("connection: open from %s", socket.remoteAddress));
        this.logConnections();
        const self = this;
        socket.on("close", () => {
            self.log(util.format("connection: closed with %s", socket.remoteAddress));
            self.logConnections();
        });
    }

}

module.exports = Server;