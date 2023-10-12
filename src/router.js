import Login from './components/Login.vue'
import Status from './components/Status.vue'
import Service from './components/Service.vue'
import { createRouter, createWebHashHistory } from "vue-router";

const history = createWebHashHistory(
  // import.meta.env.BASE_URL
);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/status',
    component: Status,
  },
  {
    path: '/service',
    component: Service,
  },
];

const router = createRouter({
  history,
  routes
});

export default router;