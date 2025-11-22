<!-- src/modules/catalogos/views/ConfigCatalogos.vue -->
<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-white">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Gestión de Catálogos</h1>
          <p class="text-sm text-gray-600 mt-1">Administre los catálogos maestros del sistema</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Selector de catálogo -->
          <select
            v-model="catalogoActivo"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Seleccione un catálogo</option>
            <option 
              v-for="catalogo in catalogos" 
              :key="catalogo.id"
              :value="catalogo.id"
            >
              {{ catalogo.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-1 overflow-hidden p-6">
      <CatalogoManager
        v-if="catalogoActivo && catalogoConfigActual"
        :catalogo-config="catalogoConfigActual"
        :items="itemsCatalogo"
        :columnas="columnasCatalogo"
        @nuevo-item="mostrarFormularioNuevo"
        @editar-item="editarItem"
        @eliminar-item="eliminarItem"
        @estado-cambiado="cambiarEstadoItem"
      />

      <!-- Vista de bienvenida -->
      <div v-else class="h-full flex items-center justify-center text-gray-500">
        <div class="text-center">
          <Cog6ToothIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Seleccione un catálogo</h3>
          <p class="text-gray-600">Elija un catálogo de la lista para comenzar a gestionarlo</p>
        </div>
      </div>
    </div>

    <!-- Modales (placeholder para futura implementación) -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

// Importación CORREGIDA - ruta relativa correcta
import CatalogoManager from '../components/CatalogoManager.vue'

// Estado reactivo
const catalogoActivo = ref('')
const itemsCatalogo = ref([])

// Catálogos disponibles
const catalogos = ref([
  {
    id: 'tipos-documento',
    nombre: 'Tipos de Documento',
    descripcion: 'Gestione los tipos de documentos del sistema',
    singular: 'Tipo de Documento',
    plural: 'Tipos de Documento',
    puedeActivar: true
  },
  {
    id: 'tipos-inmueble',
    nombre: 'Tipos de Inmueble',
    descripcion: 'Gestione los tipos de inmuebles',
    singular: 'Tipo de Inmueble',
    plural: 'Tipos de Inmueble',
    puedeActivar: true
  },
  {
    id: 'estados-conservacion',
    nombre: 'Estados de Conservación',
    descripcion: 'Gestione los estados de conservación de inmuebles',
    singular: 'Estado de Conservación',
    plural: 'Estados de Conservación',
    puedeActivar: true
  },
  {
    id: 'figuras-proteccion',
    nombre: 'Figuras de Protección',
    descripcion: 'Gestione las figuras de protección patrimonial',
    singular: 'Figura de Protección',
    plural: 'Figuras de Protección',
    puedeActivar: true
  },
  {
    id: 'tipos-via',
    nombre: 'Tipos de Vía',
    descripcion: 'Gestione los tipos de vías públicas',
    singular: 'Tipo de Vía',
    plural: 'Tipos de Vía',
    puedeActivar: true
  }
])

// Configuración del catálogo actual
const catalogoConfigActual = computed(() => {
  return catalogos.value.find(c => c.id === catalogoActivo.value) || null
})

// Columnas según el catálogo seleccionado
const columnasCatalogo = computed(() => {
  const columnasBase = [
    { key: 'id', label: 'ID', tipo: 'texto' },
    { key: 'nombre', label: 'Nombre', tipo: 'texto' },
    { key: 'descripcion', label: 'Descripción', tipo: 'texto' },
    { key: 'estado', label: 'Estado', tipo: 'estado' }
  ]

  switch (catalogoActivo.value) {
    case 'tipos-documento':
      return [
        { key: 'id', label: 'ID', tipo: 'texto' },
        { key: 'nombre', label: 'Nombre', tipo: 'texto' },
        { key: 'descripcion', label: 'Descripción', tipo: 'texto' },
        { key: 'mime_types', label: 'Tipos MIME', tipo: 'texto' },
        { key: 'max_tamano', label: 'Tamaño Máx. (MB)', tipo: 'numero' },
        { key: 'estado', label: 'Estado', tipo: 'estado' }
      ]
    
    case 'tipos-inmueble':
      return [
        { key: 'id', label: 'ID', tipo: 'texto' },
        { key: 'nombre', label: 'Nombre', tipo: 'texto' },
        { key: 'descripcion', label: 'Descripción', tipo: 'texto' },
        { key: 'categoria', label: 'Categoría', tipo: 'texto' },
        { key: 'es_edificio', label: 'Es Edificio', tipo: 'boolean' },
        { key: 'estado', label: 'Estado', tipo: 'estado' }
      ]
    
    case 'estados-conservacion':
      return [
        { key: 'id', label: 'ID', tipo: 'texto' },
        { key: 'nombre', label: 'Nombre', tipo: 'texto' },
        { key: 'descripcion', label: 'Descripción', tipo: 'texto' },
        { key: 'nivel_gravedad', label: 'Nivel Gravedad', tipo: 'numero' },
        { key: 'color', label: 'Color', tipo: 'texto' },
        { key: 'estado', label: 'Estado', tipo: 'estado' }
      ]
    
    default:
      return columnasBase
  }
})

// Cargar datos del catálogo
const cargarItemsCatalogo = () => {
  // Datos mock - en una app real esto vendría de una API
  const datosMock = {
    'tipos-documento': [
      { id: '1', nombre: 'PDF', descripcion: 'Documento PDF', mime_types: 'application/pdf', max_tamano: 10, estado: 'activo' },
      { id: '2', nombre: 'Imagen', descripcion: 'Imágenes JPEG, PNG', mime_types: 'image/jpeg,image/png', max_tamano: 5, estado: 'activo' },
      { id: '3', nombre: 'Word', descripcion: 'Documento Word', mime_types: 'application/msword', max_tamano: 15, estado: 'inactivo' }
    ],
    'tipos-inmueble': [
      { id: '1', nombre: 'Iglesia', descripcion: 'Edificio religioso', categoria: 'Religioso', es_edificio: true, estado: 'activo' },
      { id: '2', nombre: 'Capilla', descripcion: 'Pequeño edificio religioso', categoria: 'Religioso', es_edificio: true, estado: 'activo' },
      { id: '3', nombre: 'Ermita', descripcion: 'Santuario rural', categoria: 'Religioso', es_edificio: true, estado: 'activo' }
    ],
    'estados-conservacion': [
      { id: '1', nombre: 'Excelente', descripcion: 'Sin daños aparentes', nivel_gravedad: 1, color: '#10B981', estado: 'activo' },
      { id: '2', nombre: 'Bueno', descripcion: 'Pequeños daños', nivel_gravedad: 2, color: '#3B82F6', estado: 'activo' },
      { id: '3', nombre: 'Regular', descripcion: 'Daños moderados', nivel_gravedad: 3, color: '#F59E0B', estado: 'activo' },
      { id: '4', nombre: 'Malo', descripcion: 'Daños severos', nivel_gravedad: 4, color: '#EF4444', estado: 'activo' }
    ],
    'figuras-proteccion': [
      { id: '1', nombre: 'BIC', descripcion: 'Bien de Interés Cultural', estado: 'activo' },
      { id: '2', nombre: 'Monumento', descripcion: 'Monumento histórico', estado: 'activo' }
    ],
    'tipos-via': [
      { id: '1', nombre: 'Calle', descripcion: 'Vía urbana', estado: 'activo' },
      { id: '2', nombre: 'Avenida', descripcion: 'Vía principal', estado: 'activo' },
      { id: '3', nombre: 'Plaza', descripcion: 'Espacio público', estado: 'activo' }
    ]
  }

  itemsCatalogo.value = datosMock[catalogoActivo.value] || []
}

// Watch para cargar datos cuando cambia el catálogo
watch(catalogoActivo, (newVal) => {
  if (newVal) {
    cargarItemsCatalogo()
  } else {
    itemsCatalogo.value = []
  }
})

// Handlers de eventos
const mostrarFormularioNuevo = () => {
  console.log('Mostrar formulario para nuevo item en:', catalogoActivo.value)
  // Aquí se abriría un modal para crear nuevo item
}

const editarItem = (item) => {
  console.log('Editar item:', item, 'en catálogo:', catalogoActivo.value)
  // Aquí se abriría un modal para editar el item
}

const eliminarItem = (item) => {
  console.log('Eliminar item:', item, 'en catálogo:', catalogoActivo.value)
  // Aquí se mostraría confirmación y se eliminaría el item
}

const cambiarEstadoItem = (item) => {
  console.log('Cambiar estado del item:', item, 'en catálogo:', catalogoActivo.value)
  // Aquí se actualizaría el estado del item
}

// Inicializar
onMounted(() => {
  // Seleccionar primer catálogo por defecto
  if (catalogos.value.length > 0) {
    catalogoActivo.value = catalogos.value[0].id
  }
})
</script>