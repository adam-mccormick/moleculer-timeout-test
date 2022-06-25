# Moleculer HTTP Timeout Test

With regards to https://github.com/moleculerjs/moleculer-web/issues/311

Both examples given, one using Koa and one using Moleculer Web should not time out. A docker example is
included which uses ubuntu 22.04 and Node 18.4.0 and runs the moleculer example by default.

# Usage

## Local
- `npm run koa` and visit http://localhost:8080/index/lists
- `npm run mol` and visit http://localhost:8080/custom/useragent

Both the above requests should not time out.

## Docker
- `docker build -t moleculer-timeout-test .`
- `docker run -p 8080:8080 moleculer-timeout-test`
- http://localhost:8080/custom/useragent

Response should take ~6 minutes and not timeout
