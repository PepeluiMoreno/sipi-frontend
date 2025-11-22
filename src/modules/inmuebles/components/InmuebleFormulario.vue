<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
      <h2 class="font-semibold text-gray-900 truncate">{{ property.direccion }}</h2>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Pestañas -->
    <div class="flex flex-wrap border-b border-gray-200 bg-gray-50">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-4 py-2 text-sm font-medium transition-colors flex items-center"
        :class="activeTab === tab.key ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <component :is="tab.icon" class="w-4 h-4 mr-2" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Contenido de pestañas -->
    <div class="flex-1 overflow-y-auto">
      <InmuebleFormularioBasicos v-if="activeTab === 'basicos'" :property="property" />
      <InmuebleFormularioActuaciones v-if="activeTab === 'actuaciones'" :property="property" />
      <InmuebleFormularioInmatriculacion v-if="activeTab === 'inmatriculacion'" :property="property" />
      <InmuebleFormularioOSM v-if="activeTab === 'osm'" :property="property" />
      <InmuebleFormularioTransmisiones v-if="activeTab === 'transmisiones'" :property="property" />
      <InmuebleFormularioWikidata v-if="activeTab === 'wikidata'" :property="property" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XMarkIcon, HomeIcon, WrenchScrewdriverIcon, DocumentIcon, MapPinIcon, ArrowPathIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import InmuebleFormularioBasicos from './InmuebleFormularioBasicos.vue'
import InmuebleFormularioActuaciones from './InmuebleFormularioActuaciones.vue'
import InmuebleFormularioInmatriculacion from './InmuebleFormularioInmatriculacion.vue'
import InmuebleFormularioOSM from './InmuebleFormularioOSM.vue'
import InmuebleFormularioTransmisiones from './InmuebleFormularioTransmisiones.vue'
import InmuebleFormularioWikidata from './InmuebleFormularioWikidata.vue'

defineProps(['property'])
defineEmits(['close'])

const tabs = [
  { key: 'basicos', label: 'Datos Básicos', icon: HomeIcon },
  { key: 'actuaciones', label: 'Actuaciones', icon: WrenchScrewdriverIcon },
  { key: 'inmatriculacion', label: 'Inmatriculación', icon: DocumentIcon },
  { key: 'osm', label: 'OpenStreetMap', icon: MapPinIcon },
  { key: 'transmisiones', label: 'Transmisiones', icon: ArrowPathIcon },
  { key: 'wikidata', label: 'Wikidata', icon: QuestionMarkCircleIcon }
]

const activeTab = ref('basicos')
</script>