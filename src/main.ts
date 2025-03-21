import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

createApp(App).use(router).mount("#app");
