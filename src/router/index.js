import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/utils/firebase';

import Home from '../views/Home.vue'
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Signup from "../views/Signup";
import Members from "../views/Members";

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/members',
    name: 'Members',
    component: Members
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/register',
    name: 'Signup',
    component: Signup,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if(hideForAuth && currentUser) {
    next('dashboard');
  } else {
    next();
  }

});

export default router
