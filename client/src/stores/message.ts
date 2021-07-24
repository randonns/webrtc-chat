import { createStore } from "@harlem/core"

export interface Message {
  userId: string
  message: string
}

const { state, mutation } = createStore<Message[]>("message", [])

export const messages = state

export const add = mutation<Message>("add", (state, payload) => {
  state.push(payload)
})
