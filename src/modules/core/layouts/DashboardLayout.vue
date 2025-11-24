<!-- src/modules/core/layouts/DashboardLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <DashboardHeader />
    
    <div class="flex flex-1">
      <aside class="w-64 bg-indigo-800 text-white">
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
            to="/inmueble-index"
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

          <!-- ACTUACIONES - DESHABILITADO (módulo no implementado) -->
          <!--
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
          -->

          <!-- TRANSMISIONES - DESHABILITADO (módulo no implementado) -->
          <!--
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
          -->

          <!-- MENÚ AGENTES -->
          <div class="pt-2">
            <button
              @click="toggleAgentesMenu"
              class="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors group text-indigo-100 hover:bg-indigo-700 hover:text-white"
            >
              <div class="flex items-center">
                <BuildingLibraryIcon class="w-5 h-5 mr-3" />
                <span class="font-medium">Agentes</span>
              </div>
              <ChevronDownIcon 
                class="w-4 h-4 transition-transform" 
                :class="{ 'rotate-180': isAgentesMenuOpen }" 
              />
            </button>
            
            <div v-if="isAgentesMenuOpen" class="ml-8 space-y-1 mt-1">
              <router-link
                to="/administraciones"
                class="flex items-center px-4 py-2 rounded-lg transition-colors group"
                :class="[
                  $route.path.includes('/administraciones')
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                ]"
              >
                <BuildingOfficeIcon class="w-4 h-4 mr-3" />
                <span class="text-sm">Administraciones</span>
              </router-link>

              <router-link
                to="/notarias"
                class="flex items-center px-4 py-2 rounded-lg transition-colors group"
                :class="[
                  $route.path.includes('/notarias')
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                ]"
              >
                <ScaleIcon class="w-4 h-4 mr-3" />
                <span class="text-sm">Notarías</span>
              </router-link>

              <router-link
                to="/registros-propiedad"
                class="flex items-center px-4 py-2 rounded-lg transition-colors group"
                :class="[
                  $route.path.includes('/registros-propiedad')
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                ]"
              >
                <DocumentDuplicateIcon class="w-4 h-4 mr-3" />
                <span class="text-sm">Registros Propiedad</span>
              </router-link>
            </div>
          </div>

          <!-- Configuración -->
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
  // DESHABILITADO: WrenchScrewdriverIcon,
  // DESHABILITADO: ArrowsRightLeftIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  DocumentDuplicateIcon
} from '@heroicons/vue/24/outline'

const isConfigMenuOpen = ref(false)
const isAgentesMenuOpen = ref(false)

const toggleConfigMenu = () => {
  isConfigMenuOpen.value = !isConfigMenuOpen.value
}

const toggleAgentesMenu = () => {
  isAgentesMenuOpen.value = !isAgentesMenuOpen.value
}
</script>