<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Configuración</h1>
    
    <!-- Opciones principales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <router-link 
        to="/config/catalogs"
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-indigo-100 rounded-lg">
            <Cog6ToothIcon class="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Catálogos del Sistema</h3>
            <p class="text-sm text-gray-500">Gestionar estados, tipos, roles, etc.</p>
          </div>
        </div>
      </router-link>

      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-not-allowed opacity-50">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gray-100 rounded-lg">
            <UsersIcon class="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Usuarios</h3>
            <p class="text-sm text-gray-500">Gestión de usuarios y permisos</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-not-allowed opacity-50">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gray-100 rounded-lg">
            <CloudArrowUpIcon class="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Backup</h3>
            <p class="text-sm text-gray-500">Exportar/importar datos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido anidado (para rutas hijas) -->
    <router-view />
  </div>
</template>

<script setup>
import { Cog6ToothIcon, UsersIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'
</script>