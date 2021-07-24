import { createStore } from "@harlem/core"

export interface User {
  id?: string
}

const { getter, mutation } = createStore<User>("user", {})

export const userId = getter<string | undefined>("userId", state => state?.id)

export const setUserId = mutation<string>("setUserId", (state, payload) => {
  state.id = payload
})
