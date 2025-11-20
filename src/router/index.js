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
        path: '/inmueble-tratamiento',
        name: 'InmuebleTratamiento',
        component: () => import('../views/InmuebleTratamiento.vue'),
        meta: { title: 'Tratamiento de Inmuebles' }
      },
      {
        path: '/documentos',
        name: 'Documentos',
        component: () => import('../views/Documentos.vue'),
        meta: { title: 'Documentación' }
      },
      {
        path: '/config',
        name: 'Config',
        component: () => import('../views/Config.vue'),
        meta: { title: 'Configuración' },
        children: [
          {
            path: 'catalogos',
            name: 'ConfigCatalogos',
            component: () => import('../views/ConfigCatalogos.vue'),
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