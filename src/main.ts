import "./assets/main.css";
import "./assets/project-styles.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index"; // Remove .js extension to use TypeScript file

const app = createApp(App);
app.use(router);
app.mount("#app");