import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: 'Panel Principal' }
      },
      {
        path: '/properties',
        name: 'Properties',
        component: () => import('../views/Properties.vue'),
        meta: { title: 'Inmuebles' }
      },
      {
        path: '/documents',
        name: 'Documents',
        component: () => import('../views/Documents.vue'),
        meta: { title: 'Documentación' }
      },
      {
        path: '/config',
        name: 'Config',
        component: () => import('../views/Config.vue'),
        meta: { title: 'Configuración' },
        children: [
          {
            path: 'catalogs',
            name: 'ConfigCatalogs',
            component: () => import('../views/ConfigCatalogs.vue'),
            meta: { title: 'Gestión de Catálogos' }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router