<!-- src/modules/core/layouts/DashboardLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header compacto -->
    <DashboardHeader />
    
    <div class="flex flex-1">
      <!-- Sidebar debajo del header -->
      <aside class="w-64 bg-indigo-800 text-white">
        <!-- Navegación -->
        <nav class="p-4 space-y-1">
          <!-- Dashboard -->
          <router-link
            to="/"
            class="flex items-center px-4 py-3 rounded-lg transition-colors group"
            :class="[
              $route.path === '/'
                ? 'bg-indigo-900 text-white'
                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
            ]"
          >
            <HomeIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Dashboard</span>
          </router-link>

          <!-- Inmuebles -->
          <router-link
            to="/inmueble-tratamiento"
            class="flex items-center px-4 py-3 rounded-lg transition-colors group"
            :class="[
              $route.path.includes('/inmueble')
                ? 'bg-indigo-900 text-white'
                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
            ]"
          >
            <BuildingOfficeIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Inmuebles</span>
          </router-link>

          <!-- Documentos -->
          <router-link
            to="/documentos"
            class="flex items-center px-4 py-3 rounded-lg transition-colors group"
            :class="[
              $route.path.includes('/documentos')
                ? 'bg-indigo-900 text-white'
                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
            ]"
          >
            <DocumentTextIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Documentos</span>
          </router-link>

          <!-- Actuaciones -->
          <router-link
            to="/actuaciones"
            class="flex items-center px-4 py-3 rounded-lg transition-colors group"
            :class="[
              $route.path.includes('/actuaciones')
                ? 'bg-indigo-900 text-white'
                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
            ]"
          >
            <WrenchScrewdriverIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Actuaciones</span>
          </router-link>

          <!-- Transmisiones -->
          <router-link
            to="/transmisiones"
            class="flex items-center px-4 py-3 rounded-lg transition-colors group"
            :class="[
              $route.path.includes('/transmisiones')
                ? 'bg-indigo-900 text-white'
                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
            ]"
          >
            <ArrowsRightLeftIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Transmisiones</span>
          </router-link>

          <!-- Configuración desplegable -->
          <div class="pt-2">
            <button
              @click="toggleConfigMenu"
              class="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors group text-indigo-100 hover:bg-indigo-700 hover:text-white"
            >
              <div class="flex items-center">
                <Cog6ToothIcon class="w-5 h-5 mr-3" />
                <span class="font-medium">Configuración</span>
              </div>
              <ChevronDownIcon 
                class="w-4 h-4 transition-transform" 
                :class="{ 'rotate-180': isConfigMenuOpen }" 
              />
            </button>
            
            <!-- Submenú desplegable -->
            <div v-if="isConfigMenuOpen" class="ml-8 space-y-1 mt-1">
              <router-link
                to="/config/catalogos"
                class="flex items-center px-4 py-2 rounded-lg transition-colors group"
                :class="[
                  $route.path.includes('/config/catalogos')
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                ]"
              >
                <AdjustmentsHorizontalIcon class="w-4 h-4 mr-3" />
                <span class="text-sm">Parametrización</span>
              </router-link>

              <router-link
                to="/config/usuarios"
                class="flex items-center px-4 py-2 rounded-lg transition-colors group"
                :class="[
                  $route.path.includes('/config/usuarios')
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                ]"
              >
                <UserGroupIcon class="w-4 h-4 mr-3" />
                <span class="text-sm">Usuarios y Roles</span>
              </router-link>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Contenido principal -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardHeader from '../components/DashboardHeader.vue'
import {
  HomeIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const isConfigMenuOpen = ref(false)

const toggleConfigMenu = () => {
  isConfigMenuOpen.value = !isConfigMenuOpen.value
}
</script>