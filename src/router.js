import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import StudyPage from "./pages/StudyPage.vue";
import ForensicsPage from "./pages/ForensicsPage.vue";
import NotesPage from "./pages/NotesPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/study", name: "study", component: StudyPage },
    { path: "/forensics", name: "forensics", component: ForensicsPage },
    { path: "/notes", name: "notes", component: NotesPage },
    { path: "/about", name: "about", component: AboutPage },
    { path: "/contact", name: "contact", component: ContactPage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
