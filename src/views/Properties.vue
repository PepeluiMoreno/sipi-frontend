<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Inmuebles</h1>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
        <PlusIcon class="w-5 h-5 mr-2" />
        Nuevo Inmueble
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Buscar por dirección..." class="px-4 py-2 border border-gray-300 rounded-lg" />
        <select class="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Todos los estados</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
        <select class="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Todos los tipos</option>
          <option>Residencial</option>
          <option>Comercial</option>
        </select>
        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dirección</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="i in 5" :key="i" class="hover:bg-gray-50">
            <td class="px-6 py-4">{{ 1200 + i }}</td>
            <td class="px-6 py-4">Calle {{ ['Mayor', 'Alcala', 'Gran Via', 'Serrano', 'Velazquez'][i-1] }} {{ 100*i }}</td>
            <td class="px-6 py-4">Residencial</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Activo</span>
            </td>
            <td class="px-6 py-4">€{{ (450000 + i*50000).toLocaleString() }}</td>
            <td class="px-6 py-4">
              <button class="text-indigo-600 hover:text-indigo-900">Ver detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>