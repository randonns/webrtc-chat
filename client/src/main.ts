import { createApp } from "vue"
import Harlem from "@harlem/core"
import App from "./components/app.vue"
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)
app.use(Harlem)
app.mount("#app")
