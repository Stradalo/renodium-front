import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import GameDetails from '../pages/GameDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', component: HomePage },
        { path: 'catalog', component: CatalogPage },
        { path: 'catalog/:id', component: GameDetails }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
})

export default router
