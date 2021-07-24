import { nanoid } from "nanoid"

const sockets = new Map()

export function createWebsocketHandler(fastify) {
  return (con, req) => {
    const ws = con.socket

    function send(msg) {
      ws.send(JSON.stringify(msg))
    }

    function sendTo(userId, msg) {
      const socket = sockets.get(userId)
      socket && socket.send(JSON.stringify(msg))
    }

    function sendToAll(msg) {
      fastify.websocketServer.clients.forEach(client => {
        if (client.readyState === 1 && client !== ws) client.send(JSON.stringify(msg))
      })
    }

    // 연결되면 userId를 생성하고, 다른 사용자들의 목록과 보내준다.
    const userId = nanoid()
    send({ type: "init", payload: { userId, users: [...sockets.keys()] } })
    sockets.set(userId, ws)
    fastify.log.info(`${sockets.size} peers connected.`)

    ws.on("message", msg => {
      try {
        const data = JSON.parse(msg)

        switch (data.type) {
          case "offer":
            sendTo(data.to, data)
            break
          case "answer":
            sendTo(data.to, data)
            break
          case "candidate":
            sendTo(data.to, data)
            break
        }
      } catch (e) {
        fastify.log.warn("Parse failed:", msg)
      }
    })

    ws.on("close", () => {
      sockets.delete(userId)
      sendToAll({ type: "leave", payload: userId })
      fastify.log.info(`${sockets.size} peers connected.`)
    })
  }
}
