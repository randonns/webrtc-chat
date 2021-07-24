import { setUserId } from "../stores/user"
import { peers, add, remove, setReady } from "../stores/peer"
import { add as addMessage } from "../stores/message"
import { PeerConnection } from "./peer"

export default class Signaling {
  private socket = new WebSocket(`ws://${location.host}/signaling`)
  private userId?: string

  constructor() {
    this.socket.onopen = async event => {}

    this.socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case "init":
            this.onInitMessage(data.payload.userId, data.payload.users)
            break
          case "offer":
            this.onOfferMessage(data.payload, data.from)
            break
          case "answer":
            this.onAnswerMessage(data.payload, data.from)
            break
          case "candidate":
            this.onCandidateMessage(data.payload, data.from)
            break
          case "leave":
            this.onLeaveMessage(data.payload)
            break
        }
      } catch (e) {
        console.error("Message causes error:", event.data)
        throw e
      }
    }

    this.socket.onerror = event => {
      console.error("Websocket Error", event)
    }
  }

  createConnection(userId: string): PeerConnection {
    const con = new PeerConnection()
    con.onReady = () => setReady(userId)
    con.onMessage = (from, msg) => {
      addMessage({ userId: from, message: msg })
    }

    return con
  }

  async onInitMessage(userId: string, users: string[]): Promise<void> {
    setUserId(userId)
    this.userId = userId

    // 새로 접속한 Peer가 기존의 모든 Peer에게 Offer를 보낸다.
    // 따라서 처음 접속한 Peer는 Offer를 보내지 않는다.
    for (const to of users) {
      const con = this.createConnection(to)
      con.onIceCandidate = candidate => {
        this.socket.send(JSON.stringify({ type: "candidate", payload: candidate, from: userId, to }))
      }
      const offer = await con.createOffer()
      this.socket.send(JSON.stringify({ type: "offer", payload: offer, from: userId, to }))
      add({ userId: to, connection: con, ready: false })
    }
  }

  async onOfferMessage(offer: RTCSessionDescription, from: string): Promise<void> {
    // Offer를 받는 Peer
    const con = this.createConnection(from)
    const answer = await con.createAnswerFromOffer(offer)
    this.socket.send(JSON.stringify({ type: "answer", payload: answer, from: this.userId, to: from }))
    add({ userId: from, connection: con, ready: false })
  }

  async onAnswerMessage(answer: RTCSessionDescription, from: string): Promise<void> {
    // Peer 찾기
    const peer = peers.find(_ => _.userId === from)
    if (peer) await peer.connection.acceptAnswer(answer)
  }

  async onCandidateMessage(candidate: RTCIceCandidate, from: string): Promise<void> {
    // Peer 찾기
    const peer = peers.find(_ => _.userId === from)
    if (peer) await peer.connection.addIceCandidate(candidate)
  }

  onLeaveMessage(userId: string): void {
    remove(userId)
  }
}
