<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Registros de Propiedad</h1>
        <p class="text-gray-600">Gestión de registros de la propiedad</p>
      </div>
    </div>

    <RegistroPropiedadFiltros 
      :localidades="localidades"
      @filter-change="handleFilterChange"
    />

    <RegistroPropiedadDataGrid 
      :items="items"
      :loading="loading"
      :pagination="pagination"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="handleDelete"
      @change-page="handlePageChange"
    />

    <RegistroPropiedadFormModal
      :show="showModal"
      :registro="selectedRegistro"
      :localidades="localidades"
      :loading="saving"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRegistroPropiedad } from '../composables/useRegistroPropiedad'
import { useCatalogoBase } from '../../catalogos/composables/useCatalogoBase'
import RegistroPropiedadFiltros from '../components/registroPropiedad/RegistroPropiedadFiltros.vue'
import RegistroPropiedadDataGrid from '../components/registroPropiedad/RegistroPropiedadDataGrid.vue'
import RegistroPropiedadFormModal from '../components/registroPropiedad/RegistroPropiedadFormModal.vue'

const registroService = useRegistroPropiedad()
const localidadService = useCatalogoBase('localidades', { conContacto: false })

const items = ref([])
const localidades = ref([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const selectedRegistro = ref(null)
const filters = ref({})

onMounted(async () => {
  await loadLocalidades()
  await loadRegistros()
})

const loadLocalidades = async () => {
  try {
    const { items: locs } = await localidadService.listar()
    localidades.value = locs
  } catch (error) {
    console.error('Error cargando localidades:', error)
  }
}

const loadRegistros = async () => {
  loading.value = true
  try {
    const { items: regs } = await registroService.listar(filters.value)
    items.value = regs
  } catch (error) {
    console.error('Error cargando registros:', error)
  } finally {
    loading.value = false
  }
}

const handleFilterChange = async (newFilters) => {
  filters.value = newFilters
  registroService.pagination.page = 1
  await loadRegistros()
}

const handlePageChange = async (newPage) => {
  registroService.cambiarPagina(newPage)
  await loadRegistros()
}

const openCreateModal = () => {
  selectedRegistro.value = null
  showModal.value = true
}

const openEditModal = (id) => {
  selectedRegistro.value = items.value.find(r => r.id === id)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRegistro.value = null
}

const handleSave = async (data) => {
  saving.value = true
  try {
    if (data.id) {
      await registroService.actualizar(data.id, data)
    } else {
      await registroService.crear(data)
    }
    await loadRegistros()
    closeModal()
  } catch (error) {
    console.error('Error guardando registro:', error)
  } finally {
    saving.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('¿Está seguro de eliminar este registro?')) return
  
  try {
    await registroService.eliminar(id)
    await loadRegistros()
  } catch (error) {
    console.error('Error eliminando registro:', error)
  }
}

const { pagination } = registroService
</script>