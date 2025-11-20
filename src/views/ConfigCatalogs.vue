<template>
  <div class="h-[calc(100vh-8rem)] overflow-hidden">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Gestión de Catálogos</h1>
    
    <div class="flex h-full">
      <!-- Panel izquierdo: Lista vertical de catálogos -->
      <div class="w-80 bg-white rounded-lg shadow mr-6 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">Catálogos disponibles</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
          <button
            v-for="catalog in catalogs"
            :key="catalog.key"
            @click="selectCatalog(catalog)"
            class="w-full text-left p-3 rounded-lg hover:bg-indigo-50 flex items-center space-x-3 mb-1 transition-colors"
            :class="{ 'bg-indigo-50 border-l-4 border-indigo-600': selectedCatalog?.key === catalog.key }"
          >
            <component :is="catalog.icon" class="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 truncate">{{ catalog.name }}</h3>
              <p class="text-xs text-gray-500">{{ catalog.count }} registros</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Panel derecho: Contenido del catálogo seleccionado -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="selectedCatalog" class="bg-white rounded-lg shadow">
          <CatalogManager
            :title="selectedCatalog.name"
            :singular-title="selectedCatalog.singularName"
            :api-endpoint="selectedCatalog.key"
            :display-fields="selectedCatalog.displayFields"
            :form-fields="selectedCatalog.formFields"
          />
        </div>
        
        <!-- Estado vacío -->
        <div v-else class="bg-white rounded-lg shadow h-full flex items-center justify-center">
          <div class="text-center py-12 px-6">
            <Cog6ToothIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un catálogo</h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Elige un catálogo de la lista para gestionar sus registros. Podrás añadir, editar y eliminar elementos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import CatalogManager from '../components/catalogs/CatalogManager.vue'
import {
  HomeIcon, DocumentTextIcon, UserIcon, KeyIcon, BuildingOfficeIcon,
  ShieldCheckIcon, InboxIcon, UsersIcon, ArrowsRightLeftIcon,
  MapPinIcon, DocumentDuplicateIcon
} from '@heroicons/vue/24/outline'

const selectedCatalog = ref(null)

const catalogs = [
  { 
    key: 'estados-conservacion', 
    name: 'Estados de Conservación', 
    singularName: 'Estado de Conservación',
    icon: HomeIcon,
    count: 8,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'estados-tratamiento', 
    name: 'Estados de Tratamiento', 
    singularName: 'Estado de Tratamiento',
    icon: DocumentTextIcon,
    count: 12,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'figuras-proteccion', 
    name: 'Figuras de Protección', 
    singularName: 'Figura de Protección',
    icon: ShieldCheckIcon,
    count: 15,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'roles-tecnico', 
    name: 'Roles de Técnico', 
    singularName: 'Rol de Técnico',
    icon: UserIcon,
    count: 6,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-certificacion', 
    name: 'Tipos de Certificación', 
    singularName: 'Tipo de Certificación',
    icon: KeyIcon,
    count: 4,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-documento', 
    name: 'Tipos de Documento', 
    singularName: 'Tipo de Documento',
    icon: InboxIcon,
    count: 25,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-inmueble', 
    name: 'Tipos de Inmueble', 
    singularName: 'Tipo de Inmueble',
    icon: BuildingOfficeIcon,
    count: 18,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-mime', 
    name: 'Tipos MIME', 
    singularName: 'Tipo MIME',
    icon: DocumentDuplicateIcon,
    count: 42,
    displayFields: [
      { key: 'tipo_mime', label: 'MIME Type' },
      { key: 'extension', label: 'Extensión' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'tipo_mime', label: 'MIME Type', type: 'text' },
      { key: 'extension', label: 'Extensión', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-persona', 
    name: 'Tipos de Persona', 
    singularName: 'Tipo de Persona',
    icon: UsersIcon,
    count: 7,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-transmision', 
    name: 'Tipos de Transmisión', 
    singularName: 'Tipo de Transmisión',
    icon: ArrowsRightLeftIcon,
    count: 9,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  },
  { 
    key: 'tipos-via', 
    name: 'Tipos de Vía', 
    singularName: 'Tipo de Vía',
    icon: MapPinIcon,
    count: 13,
    displayFields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripción' }
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ]
  }
]

const selectCatalog = (catalog) => {
  selectedCatalog.value = catalog
}
</script>