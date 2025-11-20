<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
      <h2 class="font-semibold text-gray-900 truncate">{{ property.direccion }}</h2>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex-shrink-0 border-b border-gray-200">
      <nav class="flex space-x-6 px-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          class="py-3 text-sm font-medium border-b-2"
          :class="activeTab === tab.key ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Contenido dinámico -->
    <div class="flex-1 overflow-y-auto p-6">
      <component 
        :is="tabComponents[activeTab]" 
        :property="property"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import InmuebleFormularioBasicos from './InmuebleFormularioBasicos.vue'
import InmuebleFormularioInmatriculacion from './InmuebleFormularioInmatriculacion.vue'
import InmuebleFormularioTransmisiones from './InmuebleFormularioTransmisiones.vue'
import InmuebleFormularioActuaciones from './InmuebleFormularioActuaciones.vue'
import InmuebleFormularioOSM from './InmuebleFormularioOSM.vue'
import InmuebleFormularioWikidata from './InmuebleFormularioWikidata.vue'

const props = defineProps(['property'])
defineEmits(['close'])

const activeTab = ref('basicos')

const tabs = [
  { key: 'basicos', label: 'Datos Básicos' },
  { key: 'inmatriculacion', label: 'Inmatriculación' },
  { key: 'transmisiones', label: 'Transmisiones' },
  { key: 'actuaciones', label: 'Actuaciones' },
  { key: 'osm', label: 'OpenStreetMap' },
  { key: 'wikidata', label: 'Wikidata' }
]

const tabComponents = {
  basicos: InmuebleFormularioBasicos,
  inmatriculacion: InmuebleFormularioInmatriculacion,
  transmisiones: InmuebleFormularioTransmisiones,
  actuaciones: InmuebleFormularioActuaciones,
  osm: InmuebleFormularioOSM,
  wikidata: InmuebleFormularioWikidata
}
</script>