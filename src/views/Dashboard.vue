<template>
  <div>
    <!-- Welcome banner -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Bienvenido, {{ authStore.user.name }}</h2>
      <p class="text-indigo-100">Panel de Control del Patrimonio Inmueble</p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <BuildingOfficeIcon class="w-10 h-10 text-blue-600 mb-2" />
        <p class="text-sm font-medium text-gray-600">Inmuebles Detectados</p>
        <p class="text-3xl font-bold text-gray-900">31.245</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <HomeIcon class="w-10 h-10 text-green-600 mb-2" />
        <p class="text-sm font-medium text-gray-600">Inmatriculados</p>
        <p class="text-3xl font-bold text-gray-900">28.904</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <ShieldCheckIcon class="w-10 h-10 text-purple-600 mb-2" />
        <p class="text-sm font-medium text-gray-600">BICs Catalogados</p>
        <p class="text-3xl font-bold text-gray-900">42</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <ShoppingBagIcon class="w-10 h-10 text-yellow-600 mb-2" />
        <p class="text-sm font-medium text-gray-600">En Venta</p>
        <p class="text-3xl font-bold text-gray-900">23</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <CheckCircleIcon class="w-10 h-10 text-green-600 mb-2" />
        <p class="text-sm font-medium text-gray-600">Vendidos</p>
        <p class="text-3xl font-bold text-gray-900">156</p>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Últimos inmuebles -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-semibold text-gray-900">Últimos Inmuebles</h3>
        </div>
        <div class="p-6">
          <div v-for="i in 3" :key="i" class="p-3 bg-gray-50 rounded-lg mb-3">
            <p class="font-medium">Calle {{ i }}</p>
            <p class="text-xs text-gray-500">Estado: Pendiente</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import {
  BuildingOfficeIcon,
  HomeIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
</script>