import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
app.use(router);

/* v-reveal: fade-up on scroll */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("reveal-in")),
  { threshold: 0.12 }
);
app.directive("reveal", {
  mounted(el) {
    el.classList.add("reveal");
    io.observe(el);
  },
});
app.mount("#app");
