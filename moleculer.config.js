module.exports = {
    logger: "console",
    logLevel: "info",

    // Number of milliseconds to wait before reject a request with a RequestTimeout error. Disabled: 0
    requestTimeout: 10 * 1000,

    validator: true,

    tracing: {
        enabled: false,
        exporter: {
            type: "console",
            options: {
                logger: null,
                colors: true,
                width: 100,
                gaugeWidth: 40
            }
        }
    },
};
