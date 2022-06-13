import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'mesas',
    component: () => import('../views/MesasView.vue')
  },
  {
    path: '/ordenes',
    name: 'ordenes',
    component: () => import('../views/OrdenesView.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuView.vue')
  },
  {
    path: '/administracion',
    name: 'administracion',
    component: () => import('../views/AdministracionView.vue')
  },

  {
    path: '/consultas',
    name: 'consultas',
    component: () => import('../views/ConsultasView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
