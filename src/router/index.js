import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'viewall',
      component: () => import('../views/viewall.vue'),
    },
    {
      path: '/drag1',
      name: 'drag1',
      component: () => import('../views/drag1.vue'),
    },
    // {
    //   path: '/new',
    //   name: 'new',
    //   component: () => import('../views/new.vue'),
    // },
    // {
    //   path: '/new2',
    //   name: 'new2',
    //   component: () => import('../views/new2.vue'),
    // },
    // {
    //   path: '/drag2',
    //   name: 'drag2',
    //   component: () => import('../views/drag2.vue'),
    // },
    {
      path: '/range',
      name: 'range',
      component: () => import('../views/range.vue'),
    }
  ],
})

export default router
