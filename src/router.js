import Login from './components/Login.vue'
import Status from './components/Status.vue'
import Service from './components/Service.vue'
import Roles from './components/Roles.vue'
import Departments from './components/Departments.vue'
import Village from './components/Village.vue'
import Identification from './components/Identification.vue'
import WattmeterBrand from './components/WattmeterBrand.vue'
import Wattmeter from './components/Wattmeter.vue'
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

  {
    path: '/roles',
    component: Roles,
  },
  
  {
    path: '/departments',
    component: Departments,
  },

  {
    path: '/village',
    component: Village,
  },

  {
    path: '/identificationType',
    component: Identification,
  },

  {
    path: '/wattmeterBrand',
    component: WattmeterBrand,
  },

  {
    path: '/wattmeter',
    component: Wattmeter,
  },

];

const router = createRouter({
  history,
  routes
});

export default router;