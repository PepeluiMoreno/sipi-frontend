<!-- views/VerificarEmail.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div v-if="loading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Verificando email...</p>
      </div>
      
      <div v-else-if="success" class="text-center">
        <CheckCircleIcon class="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">¡Email Verificado!</h2>
        <p class="text-gray-600 mb-6">Tu email ha sido verificado correctamente.</p>
        <router-link to="/login" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Ir al Login
        </router-link>
      </div>
      
      <div v-else class="text-center">
        <ExclamationTriangleIcon class="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Error de Verificación</h2>
        <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
        <router-link to="/" class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
          Volver al Inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useMutation } from '@vue/apollo-composable'
import { VERIFICAR_EMAIL } from '../graphql/mutations'

const route = useRoute()
const loading = ref(true)
const success = ref(false)
const errorMessage = ref('')

const { mutate: verificarEmail } = useMutation(VERIFICAR_EMAIL)

onMounted(async () => {
  const token = route.params.token
  
  try {
    const result = await verificarEmail({ token })
    
    if (result.data.verificarEmail.success) {
      success.value = true
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
})
</script>