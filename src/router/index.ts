import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import SearchView from '../views/SearchView.vue'
import CityView from '../views/CityView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/favorites',
    component: FavoritesView,
  },
  {
    path: '/search',
    component: SearchView,
  },
  {
    path: '/city/:lat/:lon',
    component: CityView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
