<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
      <button 
        @click="openForm()"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Añadir {{ singularTitle }}
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <form @submit.prevent="saveItem" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="field in formFields" :key="field.key">
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
          <input 
            v-if="field.type === 'text'"
            v-model="formData[field.key]"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            v-else-if="field.type === 'textarea'"
            v-model="formData[field.key]"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <div class="flex items-end space-x-2 md:col-span-3">
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Guardar
          </button>
          <button type="button" @click="closeForm" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="field in displayFields" :key="field.key" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {{ field.label }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
            <td v-for="field in displayFields" :key="field.key" class="px-6 py-4 text-sm text-gray-900">
              {{ getNestedValue(item, field.key) }}
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900 p-1" title="Editar">
                <PencilIcon class="w-4 h-4" />
              </button>
              <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900 p-1" title="Eliminar">
                <TrashIcon class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Estado vacío -->
    <div v-if="items.length === 0" class="text-center py-12">
      <InboxIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">No hay registros en este catálogo</p>
      <button @click="openForm()" class="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        Añadir el primer registro
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, PencilIcon, TrashIcon, InboxIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  singularTitle: String,
  displayFields: Array,
  formFields: Array
})

const items = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const formData = ref({})

const loadItems = async () => {
  items.value = [
    { id: '1', nombre: 'Ejemplo 1', descripcion: 'Descripción 1', tipo_mime: 'text/plain', extension: 'txt' },
    { id: '2', nombre: 'Ejemplo 2', descripcion: 'Descripción 2', tipo_mime: 'application/pdf', extension: 'pdf' }
  ]
}

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || ''
}

const openForm = () => {
  isEditing.value = false
  formData.value = {}
  showForm.value = true
}

const editItem = (item) => {
  isEditing.value = true
  formData.value = { ...item }
  showForm.value = true
}

const deleteItem = async (item) => {
  if (confirm(`¿Eliminar ${props.singularTitle} "${item.nombre}"?`)) {
    items.value = items.value.filter(i => i.id !== item.id)
  }
}

const saveItem = async () => {
  if (isEditing.value) {
    const index = items.value.findIndex(i => i.id === formData.value.id)
    items.value[index] = { ...formData.value }
  } else {
    items.value.push({ ...formData.value, id: Date.now().toString() })
  }
  closeForm()
}

const closeForm = () => {
  showForm.value = false
  formData.value = {}
}

onMounted(loadItems)
</script>