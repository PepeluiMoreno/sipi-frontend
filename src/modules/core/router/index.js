import { createRouter, createWebHistory } from 'vue-router'

// Layout
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Vistas principales
import Dashboard from '../views/Dashboard.vue'
import Config from '../views/Config.vue'
import ConfigCatalogos from '../views/ConfigCatalogos.vue'
import ConfigUsuarios from '../views/ConfigUsuarios.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard - Sistema de Patrimonio',
          requiresAuth: true
        }
      },
      {
        path: '/config',
        component: Config,
        meta: {
          title: 'Configuración del Sistema',
          requiresAuth: true
        },
        children: [
          {
            path: '',
            redirect: '/config/catalogos'
          },
          {
            path: 'catalogos',
            name: 'ConfigCatalogos',
            component: ConfigCatalogos,
            meta: {
              title: 'Gestión de Catálogos',
              requiresAuth: true,
              breadcrumb: 'Catálogos'
            }
          },
          {
            path: 'usuarios',
            name: 'ConfigUsuarios',
            component: ConfigUsuarios,
            meta: {
              title: 'Gestión de Usuarios',
              requiresAuth: true,
              breadcrumb: 'Usuarios'
            }
          }
        ]
      },
      {
        path: '/inmueble-tratamiento',
        name: 'InmuebleTratamiento',
        component: () => import('../views/InmuebleTratamiento.vue'),
        meta: {
          title: 'Tratamiento de Inmuebles',
          requiresAuth: true
        }
      },
      {
        path: '/documentos',
        name: 'Documentos',
        component: () => import('../views/Documentos.vue'),
        meta: {
          title: 'Documentos',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  console.log('🔄 Navegando a:', to.path)
  
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.requiresAuth) {
    const isAuthenticated = checkAuth()
    
    if (!isAuthenticated) {
      next('/login')
      return
    }
  }

  next()
})

router.afterEach((to, from) => {
  console.log('✅ Navegación completada a:', to.path)
})

function checkAuth() {
  const token = localStorage.getItem('auth_token')
  const hasAuthStore = true
  
  console.log('🔐 Verificando autenticación:', { token, hasAuthStore })
  
  return true
}

router.navigateTo = (path, options = {}) => {
  return router.push({ path, ...options })
}

router.replaceTo = (path, options = {}) => {
  return router.replace({ path, ...options })
}

router.getActiveRoute = () => {
  return router.currentRoute.value
}

router.isRouteActive = (routeName) => {
  return router.currentRoute.value.name === routeName
}

export default router