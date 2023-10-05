import Login from './components/Login.vue'
import Menu from './components/Menu.vue'
import { createRouter, createWebHashHistory } from "vue-router";

const history = createWebHashHistory(
  // import.meta.env.BASE_URL
);

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/menu',
    component: Menu,
  },
];

const router = createRouter({
  history,
  routes
});

export default router;