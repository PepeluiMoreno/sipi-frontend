<template>
  <div class="space-y-3">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Vista previa -->
    <div v-if="previewUrl" class="relative">
      <img 
        :src="previewUrl" 
        alt="Vista previa"
        class="w-full h-48 object-cover rounded-lg border border-gray-300"
      >
      <button
        @click="removeImage"
        class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Upload area -->
    <div 
      v-else
      @click="triggerFileInput"
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
    >
      <PhotoIcon class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <p class="text-sm text-gray-600">
        <span class="text-indigo-600 font-medium">Haz clic para subir</span> o arrastra y suelta
      </p>
      <p class="text-xs text-gray-500 mt-1">
        PNG, JPG, WEBP hasta 10MB
      </p>
    </div>

    <!-- Input file hidden -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="onFileSelected"
      class="hidden"
    >

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { PhotoIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: [String, File],
    default: ''
  },
  label: {
    type: String,
    default: 'Imagen'
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const previewUrl = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen no puede superar los 10MB')
      return
    }

    // Crear URL para vista previa
    previewUrl.value = URL.createObjectURL(file)
    emit('update:modelValue', file)
  }
}

const removeImage = () => {
  previewUrl.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Si el modelValue es una URL (no un File), mostrarla
watch(() => props.modelValue, (newValue) => {
  if (typeof newValue === 'string' && newValue) {
    previewUrl.value = newValue
  } else if (!newValue) {
    previewUrl.value = ''
  }
}, { immediate: true })
</script>