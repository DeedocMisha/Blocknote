import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/src/',  // Обновляем путь на новую точку
      name: 'Home',
      component: Home
    },
    {
      path: '/src/about',  // Обновляем путь на новую точку
      name: 'About',
      component: About
    }
  ]
})