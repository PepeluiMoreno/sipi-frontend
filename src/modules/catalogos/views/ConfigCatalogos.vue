<template>
  <div class="h-[calc(100vh-8rem)] overflow-hidden">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Gestión de Catálogos</h1>
    
    <div class="flex h-full">
      <!-- Lista lateral de catálogos -->
      <div class="w-80 bg-white rounded-lg shadow mr-6 flex flex-col flex-shrink-0">
        <div class="p-4 border-b border-gray-200">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar catálogo..."
              class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
          <button
            v-for="catalogo in filteredCatalogos"
            :key="catalogo.key"
            @click="selectCatalogo(catalogo)"
            class="w-full text-left p-3 rounded-lg hover:bg-indigo-50 flex items-center space-x-3 mb-1 transition-colors"
            :class="{ 
              'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700': selectedCatalogo?.key === catalogo.key,
              'opacity-50': catalogo.disabled
            }"
            :disabled="catalogo.disabled"
          >
            <component :is="catalogo.icon" class="w-5 h-5 flex-shrink-0" :class="selectedCatalogo?.key === catalogo.key ? 'text-indigo-600' : 'text-gray-600'" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium truncate">{{ catalogo.name }}</h3>
              <p class="text-xs text-gray-500">{{ catalogo.count }} registros</p>
            </div>
            <ExclamationTriangleIcon v-if="catalogo.disabled" class="w-4 h-4 text-amber-500 flex-shrink-0" />
          </button>
        </div>
      </div>

      <!-- Panel derecho: Manager del catálogo seleccionado -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="selectedCatalogo" class="bg-white rounded-lg shadow">
          <CatalogoManager
            :title="selectedCatalogo.name"
            :singular-title="selectedCatalogo.singularName"
            :description="selectedCatalogo.description"
            :api-endpoint="selectedCatalogo.key"
            :display-fields="selectedCatalogo.displayFields"
            :form-fields="selectedCatalogo.formFields"
          />
        </div>
        
        <!-- Estado vacío -->
        <div v-else class="bg-white rounded-lg shadow h-full flex items-center justify-center">
          <div class="text-center py-12 px-6">
            <Cog6ToothIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un catálogo</h3>
            <p class="text-gray-500">Elige un catálogo de la lista para gestionar sus registros</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Cog6ToothIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import CatalogoManager from '../components/catalogos/CatalogoManager.vue'
import {
  HomeIcon, DocumentTextIcon, ShieldCheckIcon, UserIcon,
  BuildingOfficeIcon, InboxIcon, UsersIcon, ArrowsRightLeftIcon,
  MapPinIcon, DocumentDuplicateIcon, BookmarkIcon, LinkIcon
} from '@heroicons/vue/24/outline'

const selectedCatalogo = ref(null)
const searchQuery = ref('')

const catalogos = ref([])

const loadCatalogosConfig = async () => {
  try {
    // TODO: Implementar query Apollo/GraphQL para configuración de catálogos
    /*
    const { data } = await apolloClient.query({
      query: gql`
        query GetCatalogosConfig {
          catalogosConfig {
            key
            name
            singularName
            description
            count
            displayFields
            formFields
          }
        }
      `
    })
    catalogos.value = data.catalogosConfig
    */
    
    // Configuración estática temporal
    catalogos.value = [
      { 
        key: 'estados-conservacion', 
        name: 'Estados de Conservación', 
        singularName: 'Estado de Conservación',
        description: 'Gestionar los diferentes estados de conservación de los inmuebles',
        icon: HomeIcon,
        count: 0,
        displayFields: [
          { key: 'nombre', label: 'Nombre' },
          { key: 'descripcion', label: 'Descripción' }
        ],
        formFields: [
          { key: 'nombre', label: 'Nombre', type: 'text', required: true, maxLength: 100 },
          { key: 'descripcion', label: 'Descripción', type: 'textarea', rows: 3 }
        ]
      },
      // ... otros catálogos
    ]
  } catch (error) {
    console.error('Error cargando configuración de catálogos:', error)
  }
}

const filteredCatalogos = computed(() => {
  if (!searchQuery.value) return catalogos.value
  
  const query = searchQuery.value.toLowerCase()
  return catalogos.value.filter(catalogo => 
    catalogo.name.toLowerCase().includes(query) ||
    catalogo.description.toLowerCase().includes(query) ||
    catalogo.key.toLowerCase().includes(query)
  )
})

const selectCatalogo = (catalogo) => {
  if (catalogo.disabled) return
  selectedCatalogo.value = catalogo
}

onMounted(loadCatalogosConfig)
</script>