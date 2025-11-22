import { createRouter, createWebHistory } from 'vue-router'

// Layout
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Vistas principales 
import Dashboard from '../views/Dashboard.vue'

// Vistas de configuración (rutas reales)
import Config from '../../catalogos/views/Config.vue'
import ConfigCatalogos from '../../catalogos/views/ConfigCatalogos.vue'
import ConfigUsuarios from '../../usuarios/views/ConfigUsuarios.vue'

// Vistas de módulos principales
import Documentos from '../../documentos/views/Documentos.vue'
import InmuebleTratamiento from '../../inmuebles/views/InmuebleTratamiento.vue'

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
          requiresAuth: true,
          icon: 'HomeIcon'
        }
      },
      {
        path: '/inmueble-tratamiento',
        name: 'InmuebleTratamiento',
        component: InmuebleTratamiento,
        meta: {
          title: 'Tratamiento de Inmuebles',
          requiresAuth: true,
          icon: 'BuildingOfficeIcon'
        }
      },
      {
        path: '/documentos',
        name: 'Documentos',
        component: Documentos,
        meta: {
          title: 'Gestión de Documentos',
          requiresAuth: true,
          icon: 'DocumentTextIcon'
        }
      },
      // Módulos en desarrollo - usando factory pattern para mocking
      ...createMockRoutes([
        {
          path: '/actuaciones',
          name: 'Actuaciones',
          title: 'Gestión de Actuaciones',
          icon: 'WrenchScrewdriverIcon'
        },
        {
          path: '/transmisiones',
          name: 'Transmisiones', 
          title: 'Gestión de Transmisiones',
          icon: 'ArrowsRightLeftIcon'
        }
      ]),
      {
        path: '/config',
        component: Config,
        meta: {
          title: 'Configuración del Sistema',
          requiresAuth: true,
          icon: 'CogIcon'
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
          },
          // Configuración de documentos - usando factory pattern
          ...createMockConfigRoutes([
            {
              path: 'documentos',
              name: 'ConfigDocumentos',
              title: 'Configuración de Documentos',
              breadcrumb: 'Documentos'
            }
          ])
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../auth/views/Login.vue'),
    meta: {
      title: 'Iniciar Sesión - SIPI',
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../../auth/views/ForgotPassword.vue'),
    meta: {
      title: 'Recuperar Contraseña - SIPI',
      requiresAuth: false
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('../../auth/views/ResetPassword.vue'),
    meta: {
      title: 'Nueva Contraseña - SIPI',
      requiresAuth: false
    }
  },
  {
    path: '/verificar-email',
    name: 'VerificarEmail',
    component: () => import('../../usuarios/views/VerificarEmail.vue'),
    meta: {
      title: 'Verificar Email - SIPI',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Página No Encontrada - SIPI',
      requiresAuth: false
    }
  }
]

// Factory function para crear rutas mockeadas
function createMockRoutes(routesConfig) {
  return routesConfig.map(config => ({
    path: config.path,
    name: config.name,
    component: createMockComponent(config.title, config.icon),
    meta: {
      title: config.title,
      requiresAuth: true,
      icon: config.icon,
      isMocked: true // Flag para identificar rutas mockeadas
    }
  }))
}

// Factory function para rutas de configuración mockeadas
function createMockConfigRoutes(routesConfig) {
  return routesConfig.map(config => ({
    path: config.path,
    name: config.name,
    component: createMockConfigComponent(config.title),
    meta: {
      title: config.title,
      requiresAuth: true,
      breadcrumb: config.breadcrumb,
      isMocked: true
    }
  }))
}

// Componente mock profesional para módulos en desarrollo
function createMockComponent(title, icon) {
  return {
    template: `
      <div class="p-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-8 text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">${title}</h2>
            <p class="text-gray-600 mb-4">Este módulo está actualmente en desarrollo</p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p class="text-sm text-blue-700">
                <strong>Estado:</strong> En desarrollo<br>
                <strong>Próxima versión:</strong> Próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      console.log(`🔄 Cargando módulo mockeado: ${title}`)
    }
  }
}

// Componente mock específico para configuración
function createMockConfigComponent(title) {
  return {
    template: `
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">${title}</h1>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-center py-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-gray-600">Configuración en desarrollo</p>
              <p class="text-sm text-gray-500 mt-1">Disponible en próximas actualizaciones</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Navigation guards mejorados
router.beforeEach((to, from, next) => {
  console.log('🔄 Navegando a:', to.path)
  
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Log para rutas mockeadas
  if (to.meta.isMocked) {
    console.warn(`⚠️  Ruta mockeada: ${to.path} - Módulo en desarrollo`)
  }

  // En desarrollo, permitir todo sin autenticación
  if (to.meta.requiresAuth && import.meta.env.DEV) {
    console.log('🔓 Modo desarrollo: autenticación bypass')
    next()
    return
  }

  next()
})

export default router