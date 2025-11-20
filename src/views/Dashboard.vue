<template>
  <div>
    <!-- Welcome banner -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Bienvenido, {{ authStore.user.name }}</h2>
      <p class="text-indigo-100">Panel de Control del Patrimonio Inmueble</p>
    </div>

    <!-- Stats grid - 5 indicadores -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      <!-- Total Inmuebles Detectados -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Inmuebles Detectados</p>
            <p class="text-3xl font-bold text-gray-900">31.245</p>
            <p class="text-xs text-green-600 mt-1">↑ 12% vs mes anterior</p>
          </div>
          <BuildingOfficeIcon class="w-10 h-10 text-blue-600 icon-lg" />
        </div>
      </div>

      <!-- Inmuebles Inmatriculados -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Inmatriculados</p>
            <p class="text-3xl font-bold text-gray-900">28904</p>
            <p class="text-xs text-gray-500 mt-1">98% del total</p>
          </div>
          <HomeIcon class="w-10 h-10 text-green-600 icon-lg" />
        </div>
      </div>

      <!-- BICs (Bienes de Interés Cultural) -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">BICs Catalogados</p>
            <p class="text-3xl font-bold text-gray-900">42</p>
            <p class="text-xs text-purple-600 mt-1">3% del inventario</p>
          </div>
          <ShieldCheckIcon class="w-10 h-10 text-purple-600 icon-lg" />
        </div>
      </div>

      <!-- Inmuebles Puestos a la Venta -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">En Venta</p>
            <p class="text-3xl font-bold text-gray-900">23</p>
            <p class="text-xs text-yellow-600 mt-1">Valor: €2.4M</p>
          </div>
          <ShoppingBagIcon class="w-10 h-10 text-yellow-600 icon-lg" />
        </div>
      </div>

      <!-- Inmuebles Vendidos -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Vendidos</p>
            <p class="text-3xl font-bold text-gray-900">156</p>
            <p class="text-xs text-green-600 mt-1">Valor: €18.7M</p>
          </div>
          <CheckCircleIcon class="w-10 h-10 text-green-600 icon-lg" />
        </div>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Últimos inmuebles detectados -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Últimos Inmuebles Detectados</h3>
          <router-link to="/properties" class="text-indigo-600 hover:text-indigo-900 text-sm">
            Ver todos
          </router-link>
        </div>
        <div class="p-6 space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <MapPinIcon class="w-5 h-5 text-gray-400" />
              <div>
                <p class="font-medium text-gray-900">
                  {{ ['Calle Mayor 123', 'Plaza del Sol 45', 'Avda. Constitución 78'][i-1] }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ ['Madrid', 'Barcelona', 'Valencia'][i-1] }}
                </p>
              </div>
            </div>
            <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {{ ['Pendiente', 'En revisión', 'Validado'][i-1] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Actividad de inmatriculaciones -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Últimas Inmatriculaciones</h3>
          <span class="text-sm text-gray-500">Hoy</span>
        </div>
        <div class="p-6 space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <DocumentCheckIcon class="w-5 h-5 text-green-600" />
              <div>
                <p class="font-medium text-gray-900">
                  Inmueble #{{ 1240 + i }}
                </p>
                <p class="text-xs text-gray-500">
                  Inscrito en Registro el {{ new Date(Date.now() - i * 86400000).toLocaleDateString('es-ES') }}
                </p>
              </div>
            </div>
            <CheckIcon class="w-5 h-5 text-green-600" />
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
  CheckCircleIcon,
  MapPinIcon,
  DocumentCheckIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
</script>