#!/usr/bin/ env node

const path = require("path");
Server = require(path.join(__dirname, 'server.js'));

require("yargs")
    .command("$0", "start the http server", (yargs) => {
        yargs
            .option("port", {
                alias: "p",
                describe: "Port to bind on",
                default: 80,
                type: "number"
            })
            .option("ip", {
                alias: "i",
                describe: "Ip to bind on",
                default: "0.0.0.0",
                type: "string"
            })
            .option("cache-max-age", {
                describe: "<seconds> Specifies the maximum amount of time a resource will be considered fresh. Contrary to Expires, this directive is relative to the time of the request.",
                default: 0,
                type: "number"
            })
            .option("response-timeout", {
                describe: "<milliseconds> Specifies the maximum amount of time before sending the response",
                default: 1000,
                type: "number"
            })
    }, (argv) => {
        const server = new Server(argv);
        server.listen();
    })
    .alias('h', 'help')
    .help('help')
    .argv