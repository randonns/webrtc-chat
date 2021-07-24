import { createStore } from "@harlem/core"
import { PeerConnection } from "../webrtc/peer"

export interface Peer {
  userId: string
  connection: PeerConnection
  ready: boolean
}

const { state, mutation } = createStore<Peer[]>("peer", [])

export const peers = state

export const add = mutation<Peer>("add", (state, payload) => {
  state.push(payload)
})

export const remove = mutation<string>("remove", (state, payload) => {
  const index = state.findIndex(_ => _.userId === payload)
  if (index > -1) state.splice(index, 1)
})

export const setReady = mutation<string>("setReady", (state, payload) => {
  const peer = state.find(_ => _.userId === payload)
  if (peer) peer.ready = true
})
