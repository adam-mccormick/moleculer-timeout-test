"use strict";

const ApiGateway = require("moleculer-web");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
module.exports = {
    name: "api",
    version: 1,
    mixins: [ApiGateway],

    // More info about settings: http://moleculer.services/docs/moleculer-web.html
    settings: {
        port: 8080,

        httpServerTimeout: 100 * 60 * 1000,
        routes: [
            {
                path: "/custom",

                aliases: {
                    async "GET useragent"(req, res) {
                        console.log(
                            "start:" +
                            new Date().toLocaleDateString() +
                            " " +
                            new Date().toLocaleTimeString()
                        );
                        await wait(6 * 60 * 1000);

                        console.log(
                            "end:" +
                            new Date().toLocaleDateString() +
                            " " +
                            new Date().toLocaleTimeString()
                        );
                        res.writeHead(200);
                        res.end(req.headers["user-agent"]);
                    }
                }
            }
        ],
    }
};
