<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Logo y título -->
        <div class="flex items-center space-x-4">
          <button @click="toggleSidebar" class="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Bars3Icon class="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 class="text-xl font-bold text-indigo-900">SIPI</h1>
            <p class="text-xs text-gray-500">Sistema de Información del Patrimonio Inmueble</p>
          </div>
        </div>

        <!-- Search -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar inmuebles, documentos..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- User menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 rounded-lg hover:bg-gray-100">
            <BellIcon class="w-6 h-6 text-gray-600" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- User avatar -->
          <div class="relative">
            <button @click="toggleUserMenu" class="flex items-center space-x-3">
              <img :src="authStore.user.avatar" alt="Avatar" class="w-10 h-10 rounded-full" />
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user.name }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user.role }}</p>
              </div>
              <ChevronDownIcon class="w-4 h-4 text-gray-600" />
            </button>

            <!-- Dropdown -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div class="px-4 py-2 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user.name }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user.email }}</p>
              </div>
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <UserIcon class="w-4 h-4 inline mr-2" />
                Mi Perfil
              </router-link>
              <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                <ArrowLeftOnRectangleIcon class="w-4 h-4 inline mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <aside :class="[
      'fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white transform transition-transform duration-300 z-50 pt-20',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <nav class="h-full overflow-y-auto py-4">
        <div class="space-y-1">
          <router-link 
            v-for="item in navigation" 
            :key="item.path"
            :to="item.path"
            class="flex items-center px-6 py-3 text-sm font-medium hover:bg-indigo-800 rounded-lg mx-2"
            :class="{ 'bg-indigo-800': $route.path === item.path }"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- Backdrop para móvil -->
    <div 
      v-if="sidebarOpen && isMobile" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main content -->
    <main class="lg:ml-64 pt-20 min-h-screen">
      <div class="p-6">
        <!-- Breadcrumb -->
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <div class="flex items-center">
                <HomeIcon class="w-4 h-4 text-gray-400" />
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <ChevronRightIcon class="w-4 h-4 text-gray-400" />
                <span class="ml-2 text-sm font-medium text-gray-500">{{ $route.meta.title }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Page content -->
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {
  HomeIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const showUserMenu = ref(false)
const isMobile = ref(window.innerWidth < 1024)

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Inmuebles', path: '/property-treatment', icon: BuildingOfficeIcon }, // <-- Cambia /properties por /property-treatment
  { name: 'Documentación', path: '/documents', icon: DocumentTextIcon },
  { name: 'Configuración', path: '/config', icon: CogIcon }
]
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
  // router.push('/login')
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>