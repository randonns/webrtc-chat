import Fastify from "fastify"
import FastifyWebsocket from "fastify-websocket"
import { createWebsocketHandler } from "./websocket.js"

const fastify = Fastify({ logger: true })
fastify.register(FastifyWebsocket)

fastify.get("/signaling", { websocket: true }, createWebsocketHandler(fastify))

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
