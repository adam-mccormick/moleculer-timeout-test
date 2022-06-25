const { ServiceBroker } = require("moleculer");
const ApiGateway = require("moleculer-web");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const KoaRouter = require("@koa/router");

(async () => {
    const broker = new ServiceBroker({
        hotReload: true,
        nodeID: "node-1",
        logLevel: "debug",
        requestTimeout: 100 * 60 * 1000
    });
    await broker.createService({
        name: "test",
        mixins: [ApiGateway],

        settings: {
            server: false,
            port: 8080,
            httpServerTimeout: 100 * 60 * 1000
        },

        async created() {
            const app = (this.app = new Koa());
            app.broker = app.context.broker = broker;
            app.use(cors());
            app.use(bodyParser());

            const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const router = new KoaRouter();
            router.prefix("/index");
            router.get("/lists", async (ctx) => {
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
                ctx.body = "success";
            });

            app.use(router.routes());
        },

        async started() {
            try {
                let server = await this.app.listen(Number(this.settings?.port));
                server.requestTimeout = 100 * 60 * 1000;
                server.timeout = 100 * 60 * 1000;
                server.setTimeout(100 * 60 * 1000);
                // server.keepAliveTimeout = 5000;
                console.info(`web server started on port ${this.settings?.port}`);
            } catch (error) {
                return this.broker.fatal(error);
            }
        },

        async stopped() {
            if (this.app.listening) {
                this.app.close((err) => {
                    if (err) {
                        return console.error("web server close error!", err);
                    }

                    console.info("web server stopped!");
                });
            }
        }
    });
    await broker.start();
})();
