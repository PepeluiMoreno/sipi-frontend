<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
        <p v-if="description" class="text-sm text-gray-500 mt-1">{{ description }}</p>
      </div>
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
        <div v-for="field in formFields" :key="field.key" :class="field.fullWidth ? 'md:col-span-2 lg:col-span-3' : ''">
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          
          <!-- Input de texto -->
          <input 
            v-if="field.type === 'text' || field.type === 'url'"
            v-model="formData[field.key]"
            :type="field.type"
            :maxlength="field.maxLength"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            :required="field.required"
            :placeholder="field.placeholder"
          />
          
          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            v-model="formData[field.key]"
            :rows="field.rows || 3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            :required="field.required"
            :placeholder="field.placeholder"
          ></textarea>
          
          <!-- Checkbox -->
          <div v-else-if="field.type === 'checkbox'" class="flex items-center mt-2">
            <input
              v-model="formData[field.key]"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span class="ml-2 text-sm text-gray-700">{{ field.label }}</span>
          </div>
          
          <!-- Select -->
          <select
            v-else-if="field.type === 'select'"
            v-model="formData[field.key]"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            :required="field.required"
          >
            <option value="">Seleccionar...</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          
          <!-- Número -->
          <input
            v-else-if="field.type === 'number'"
            v-model.number="formData[field.key]"
            type="number"
            :min="field.min"
            :max="field.max"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            :required="field.required"
          />
        </div>
        
        <div class="flex items-end space-x-2 md:col-span-3">
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {{ isEditing ? 'Actualizar' : 'Guardar' }}
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
            <th v-for="field in displayFields" :key="field.key" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ field.label }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
            <td v-for="field in displayFields" :key="field.key" class="px-6 py-4 text-sm text-gray-900">
              <template v-if="field.type === 'boolean'">
                <span :class="getNestedValue(item, field.key) ? 'text-green-600' : 'text-red-600'">
                  {{ getNestedValue(item, field.key) ? 'Sí' : 'No' }}
                </span>
              </template>
              <template v-else-if="field.type === 'badge'">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {{ getNestedValue(item, field.key) }}
                </span>
              </template>
              <template v-else-if="field.type === 'url' && getNestedValue(item, field.key)">
                <a :href="getNestedValue(item, field.key)" target="_blank" class="text-indigo-600 hover:text-indigo-900 truncate block max-w-xs">
                  {{ field.truncate ? truncateUrl(getNestedValue(item, field.key)) : getNestedValue(item, field.key) }}
                </a>
              </template>
              <template v-else>
                {{ truncateText(getNestedValue(item, field.key), field.truncate) }}
              </template>
            </td>
            <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
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
    <div v-if="items.length === 0 && !loading" class="text-center py-12">
      <InboxIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">No hay registros en este catálogo</p>
      <button @click="openForm()" class="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        Añadir el primer registro
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <ArrowPathIcon class="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
      <p class="text-gray-500">Cargando registros...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, PencilIcon, TrashIcon, InboxIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  singularTitle: String,
  description: String,
  apiEndpoint: String,
  displayFields: Array,
  formFields: Array
})

const items = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const loading = ref(false)
const formData = ref({})

const loadItems = async () => {
  loading.value = true
  try {
    // TODO: Implementar query Apollo/GraphQL
    /*
    const { data } = await apolloClient.query({
      query: gql`
        query GetCatalogos($endpoint: String!) {
          catalogos(endpoint: $endpoint) {
            id
            nombre
            descripcion
            # otros campos según el catálogo
          }
        }
      `,
      variables: {
        endpoint: props.apiEndpoint
      }
    })
    items.value = data.catalogos
    */
    
    // Mock temporal
    items.value = []
  } catch (error) {
    console.error('Error cargando items:', error)
  } finally {
    loading.value = false
  }
}

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || ''
}

const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const truncateUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname + (urlObj.pathname !== '/' ? truncateText(urlObj.pathname, 20) : '')
  } catch {
    return truncateText(url, 30)
  }
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
  if (confirm(`¿Eliminar ${props.singularTitle} "${item.nombre || item.codigo}"?`)) {
    try {
      // TODO: Implementar mutación Apollo/GraphQL
      /*
      await apolloClient.mutate({
        mutation: gql`
          mutation DeleteCatalogo($id: ID!, $endpoint: String!) {
            deleteCatalogo(id: $id, endpoint: $endpoint) {
              success
              message
            }
          }
        `,
        variables: {
          id: item.id,
          endpoint: props.apiEndpoint
        }
      })
      */
      items.value = items.value.filter(i => i.id !== item.id)
    } catch (error) {
      console.error('Error eliminando item:', error)
    }
  }
}

const saveItem = async () => {
  try {
    if (isEditing.value) {
      // TODO: Implementar mutación Apollo/GraphQL para actualizar
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation UpdateCatalogo($id: ID!, $input: CatalogoInput!, $endpoint: String!) {
            updateCatalogo(id: $id, input: $input, endpoint: $endpoint) {
              id
              nombre
              descripcion
              # otros campos
            }
          }
        `,
        variables: {
          id: formData.value.id,
          input: formData.value,
          endpoint: props.apiEndpoint
        }
      })
      const index = items.value.findIndex(i => i.id === formData.value.id)
      items.value[index] = data.updateCatalogo
      */
      const index = items.value.findIndex(i => i.id === formData.value.id)
      items.value[index] = { ...formData.value }
    } else {
      // TODO: Implementar mutación Apollo/GraphQL para crear
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation CreateCatalogo($input: CatalogoInput!, $endpoint: String!) {
            createCatalogo(input: $input, endpoint: $endpoint) {
              id
              nombre
              descripcion
              # otros campos
            }
          }
        `,
        variables: {
          input: formData.value,
          endpoint: props.apiEndpoint
        }
      })
      items.value.push(data.createCatalogo)
      */
      items.value.push({ ...formData.value, id: Date.now().toString() })
    }
    closeForm()
  } catch (error) {
    console.error('Error guardando item:', error)
  }
}

const closeForm = () => {
  showForm.value = false
  formData.value = {}
  isEditing.value = false
}

onMounted(loadItems)
</script>